const mongoose = require("mongoose");
const db = require("../config/db");

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  interestedProperties: [
    {
      type: String,
      // ref: 'Property' // Assuming you have a Property model
    },
  ],
  assignedTo: {
    type: String,
    // ref: 'Employee' // Assuming you have an Employee model
  },
  source: {
    type: String,
    //  enum: ['website', 'referral', 'walk-in', 'other'],
    required: true,
  },
  status: {
    type: String,
    // enum: ['new', 'contacted', 'interested', 'not_interested'],
    default: "new",
  },
  remarks: {
    type: String,
  },
  followUpDate: {
    type: Date,
    default: currentTime(),
  },
  createdAt: {
    type: Date,
    default: currentTime(),
  },
  updatedAt: { type: Date, default: currentTime() },
});

module.exports = db.model("Lead", leadSchema);
