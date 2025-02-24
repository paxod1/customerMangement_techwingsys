const mongoose = require('mongoose')

const userSechema = new mongoose.Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    role: { type: String, required: true },
    profilepic: { type: String },
    password: { type: String, required: true }
})

module.exports = mongoose.model('userData_CustmerManagement', userSechema)