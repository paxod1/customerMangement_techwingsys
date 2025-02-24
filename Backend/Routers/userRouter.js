const router = require('express').Router();
const user = require('../models/userSechema');
const crypto = require('crypto-js')
const JWT = require('jsonwebtoken');
const verifyToken = require('../TokenVerification')
const customer = require('../models/customerSechema')


router.post('/login', async (req, res) => {
    console.log(req.body);
    try {
        const FindUser = await user.findOne({ email: req.body.email });
        if (!FindUser) return res.status(401).json('Invalid email or password');
        const bytes = crypto.AES.decrypt(FindUser.password, process.env.passkey);
        const originalPassword = bytes.toString(crypto.enc.Utf8);
        if (req.body.password !== originalPassword) return res.status(401).json('Invalid email or password');
        const Token = JWT.sign({ id: FindUser._id }, process.env.seckey, { expiresIn: '100d' });
        console.log("Token:", Token);
        res.status(200).json({ Token, id: FindUser._id, execuname: FindUser.fullname });

    } catch (err) {
        console.error("Error during user login:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
});


router.post('/check', verifyToken, (req, res) => {
    res.status(200).json('Token is valid');
});

router.post('/addCustomer', verifyToken, async (req, res) => {
    console.log('from add custmer backend>>>>>>>>>>>>>>', req.body);

    try {
        const newCustomer = new customer({
            fullname: req.body.fullname,
            email: req.body.email,
            phone: req.body.phone,
            way: req.body.way,
            course: req.body.course,
            date: req.body.date,
            execuId: req.body.execuId,
            execuname: req.body.execuname

        })
        await newCustomer.save()
        console.log('saved new customer data');
        res.status(200).json('saved new customer data')

    } catch (err) {
        console.error("Error during add data:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
})

router.get('/allCustomerId', async (req, res) => {
    const { id } = req.query;
    console.log("from backend>>>>>>>>>>>>>>>>>", id);
    try {
        const response = await customer.find({ execuId: id });
        console.log("from all customer datas", response);
        const responses = response.reverse()
        res.status(200).json(responses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting data', error });
    }
});

router.get('/getOnecustomerdatabyid', verifyToken, async (req, res) => {
    const { id } = req.query;
    console.log("from backend>>>>>>>>>>>>>>>>>", id);
    try {
        const response = await customer.findById(id); // Find the user by ID
        console.log("from all Executive datas", response);
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting data', error });
    }
});

router.put('/getOnecustomerdatabyid', verifyToken, async (req, res) => {
    const { id } = req.query;
    console.log("from backend>>>>>>>>>>>>>>>>>", id);
    try {
        const response = await customer.findById(id); // Find the user by ID
        console.log("from all Executive datas", response);
        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting data', error });
    }
});

router.put('/custerdailyupdate', verifyToken, async (req, res) => {
    const { id, updatedData, dailyUpdate, status, reason, method, followcontent, followdate,followupassigndate } = req.body;
  
    console.log("Request body:", req.body);
  
    const updateData = {};
  
    if (updatedData?.fullname) updateData.fullname = updatedData.fullname;
    if (updatedData?.email) updateData.email = updatedData.email;
    if (updatedData?.phone) updateData.phone = updatedData.phone;
    if (updatedData?.way) updateData.way = updatedData.way;
    if (updatedData?.course) updateData.course = updatedData.course;
    if (status) updateData.status = status;
    if (reason) updateData.reason = reason;
    if (method) updateData.method = method;
  
    if (followcontent) updateData.followupcontent = followcontent;
    if (followdate) updateData.followdate = new Date(followdate); // Ensure it's converted to Date
    if(followupassigndate) updateData.followupassigndate  =new Date(followupassigndate)
  
    try {
      const updateQuery = {
        $set: updateData,
      };
  
      if (dailyUpdate && dailyUpdate.update) {
        const timestamp = new Date();
        const newDailyUpdate = {
          update: dailyUpdate.update,
          date: timestamp,
          contact: dailyUpdate.contact || "N/A",
        };
  
        updateQuery.$push = { dailyUpdate: newDailyUpdate };
      }
  
      const updatedUser = await customer.findByIdAndUpdate(
        id,
        updateQuery,
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Error updating user', error });
    }
  });
  

  router.put('/removeFollowContent', verifyToken, async (req, res) => {
    const { id } = req.body; 
    try {
        const updateQuery = {
            $unset: { 
                followupcontent: "", 
                followdate: "" 
            }
        };
        const updatedUser = await customer.findByIdAndUpdate(
            id, 
            updateQuery, 
            { new: true } 
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'Followups doned', data: updatedUser });
    } catch (error) {
        console.error('Error removing followcontent and followdate:', error);
        res.status(500).json({ message: 'Error removing followcontent and followdate', error });
    }
});

  




module.exports = router;
