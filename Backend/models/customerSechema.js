const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  way: { type: String, required: true },
  course: { type: String, required: true },
  date: { type: String, required: true },
  execuId: { type: String, required: true },
  execuname: { type: String, required: true },
  dailyUpdate: [
    {
      update: { type: String, required: true },
      date: { type: Date, required: true },
      contact: { type: String, default: "N/A" }, // Add contact field
    },
  ],
  status: { type: String, default: 'Ongoing' },
  method: { type: String, default: 'not decided' },
  reason: { type: String, required: false },
  followupcontent: { type: String },
  followdate: { type: String, },
  followupassigndate: { type: String }
});

module.exports = mongoose.model('CustomerData_CustmerManagement', CustomerSchema);
