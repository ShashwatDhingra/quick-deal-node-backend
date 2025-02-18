const mongoose = require("mongoose");
const db = require("../config/db");

const followupSchema = mongoose.Schema({
    followUpDate: { type: Date, default: Date.now },
    followUpBy: { type: String ,  required: true },
    status: { type: String },
    comments: { type: String },
    priority: { type: String, }, // enum: ["High", "Medium", "Low"] 
    followUpType: { type: String,},// enum: ["Email", "Call", "Meeting"] 
    // relatedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Lead" },
    reminder: { type: Boolean, default: false },
    reminderDate: { type: Date },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });
  module.exports = followupSchema;