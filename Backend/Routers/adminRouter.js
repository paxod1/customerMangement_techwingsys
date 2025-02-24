const router = require('express').Router();
const admin = require('../models/adminSechema');
const crypto = require('crypto-js')
const JWT = require('jsonwebtoken');
const verifyToken = require('../TokenVerification');
const user = require('../models/userSechema');
const multer = require('multer');
const path = require('path');
const customer = require('../models/customerSechema')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.resolve(__dirname, '../../Frontend/public/Images');
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname;
        cb(null, uniqueSuffix);
    }
});

const upload = multer({ storage: storage });


// admin signup
router.post('/signup', async (req, res) => {
    console.log('Received data:', req.body);
    req.body.password = crypto.AES.encrypt(req.body.password, process.env.passkey).toString()
    try {
        const newUser = new admin({
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password
        });
        await newUser.save();
        res.status(200).json('Signup successfully');
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Error saving user', error });
    }
});

// Admin login
router.post('/login', async (req, res) => {
    console.log(req.body);
    try {
        const FindUser = await admin.findOne({ email: req.body.email });
        if (!FindUser) return res.status(401).json('Invalid email or password');
        const bytes = crypto.AES.decrypt(FindUser.password, process.env.passkey);
        const originalPassword = bytes.toString(crypto.enc.Utf8);
        if (req.body.password !== originalPassword) return res.status(401).json('Invalid email or password');
        const Token = JWT.sign({ id: FindUser._id }, process.env.seckey, { expiresIn: '100d' });
        console.log("Token:", Token);
        res.status(200).json({ Token, id: FindUser._id });

    } catch (err) {
        console.error("Error during user login:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});

// adding Executives
router.post('/AddExecutive', verifyToken, upload.single("profilepic"), async (req, res) => {
    console.log('Received data:', req.body);
    const profilePic = req.file.filename
    req.body.password = crypto.AES.encrypt(req.body.password, process.env.passkey).toString()
    try {
        const newUser = new user({
            fullname: req.body.fullname,
            email: req.body.email,
            phone: req.body.phone,
            role: req.body.role,
            profilepic: profilePic,
            password: req.body.password
        });
        await newUser.save();
        res.status(200).json('Signup successfully');
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Error saving user', error });
    }
});


// collecting all executives datas
router.get('/allExecutives', verifyToken, async (req, res) => {
    console.log("heloo admin");
    try {
        const response = await user.find()
        console.log("from all Executives datas", response);
        res.status(200).json(response);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error geting data', error });
    }
})

router.get('/getOneExecutiveDatabyId', verifyToken, async (req, res) => {
    const { id } = req.query;
    console.log("from backend>>>>>>>>>>>>>>>>>", id);

    try {
        const response = await user.findById(id); // Find the user by ID
        console.log("from all Executive datas", response);
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting data', error });
    }
});
// update executives profile data

router.put('/UpdateExecutives', verifyToken, upload.single('profilepic'), async (req, res) => {
    try {
        const { id, fullname, email, phone, role } = req.body; // Destructure fields from the body
        let profilePic = req.body.profilepic; // Get existing profile pic

        // Validate ID is provided
        if (!id) {
            return res.status(400).json({ message: 'ID is required for updating user data' });
        }

        // Update profile picture if a new file is uploaded
        if (req.file) {
            profilePic = req.file.filename; // Set new profile pic filename
        }

        // Construct the update object dynamically
        const updateData = {};

        if (fullname) updateData.fullname = fullname;
        if (email) updateData.email = email;
        if (phone) updateData.phone = phone;
        if (role) updateData.role = role;
        if (profilePic) updateData.profilepic = profilePic; // Add profilePic if available

        // Update the user in the database
        const updatedUser = await user.findByIdAndUpdate(
            id, // Find the user by ID
            { $set: updateData }, // Dynamically set fields to update
            { new: true } // Return the updated document
        );

        // Check if user exists
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with the updated user data
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user', error });
    }
});


router.get('/allCustomerAdmin', async (req, res) => {
    console.log("from backend>>>>>>>>>>>>>>>>>");
    try {
        const response = await customer.find(); 
        console.log("from all customer datas", response);
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting data', error });
    }
});



router.delete('/DeleteCustomerdataid', verifyToken, async (req, res) => {
    const { id } = req.query;
    console.log("From backend, deleting customer with ID:", id);

    try {
        const deletedCustomer = await customer.findByIdAndDelete(id);
        if (!deletedCustomer) {
            return res.status(404).json('Customer not found');
        }
        res.status(200).json('Customer deleted successfully');
    } catch (error) {
        res.status(500).json({ message: 'Error deleting customer', error });
    }
});




module.exports = router;
