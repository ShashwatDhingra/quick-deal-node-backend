const mongoose = require("mongoose");
const db = require("../config/db");
const { currentTime } = require("../utils/utils");
const { MAX } = require("uuid");
const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    min: 1000000000,
    max: 9999999999,
    unique: true,
    validate: {
      validator: (v) => /^[6-9]\d{9}$/.test(v),
      message: "Invalid phone number",
    },
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: "Invalid email address",
    },
    // required: true,
  },

  assigned: {
    type: String,
  },
  propertytype: {
    type: String,
    required: true,
   
    enum: [
      "Commercial",
      "Office",
      "Shop",
      "Residential",
      "Apartment",
      "Studio",
      "Villa",
    ],
    default: "Apartment",
  },
  leadstatus: {
    type: String,
    
    enum: ["draft", "contacted", "interested", "not_interested"],
    default: "draft",
  },
  status: {
    type: String,
    required: true,
    enum: ["Rent", "Sale"],
    default: "Sale",
  },
  remarks: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: currentTime(),
  },
  updatedAt: { type: Date, default: currentTime() },
});

module.exports = db.model("Lead", leadSchema);
