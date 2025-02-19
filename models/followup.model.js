const mongoose = require("mongoose");
const db = require("../config/db");

const { currentTime } = require("../utils/utils");
const followupSchema = mongoose.Schema({
  followUpDate: { type: Date, default: currentTime() },
  followUpBy: { type: String, required: true }, // User ID
  property: { type: String, required: true }, // Property ID
  // status: { type: String },
  comments: { type: String },
  priority: { type: String, required: true }, // enum: ["High", "Medium", "Low"]
  followUpType: { type: String }, // enum: ["Email", "Call", "Meeting"]
  // relatedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Lead" },
  reminder: { type: Boolean, default: false },
  reminderDate: { type: Date, required: true },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: currentTime() },
  updatedAt: { type: Date, default: currentTime() },
});




followupSchema.pre("findOneAndUpdate", function (next) {
  this.set({ updatedAt: currentTime() });
  next();
});

module.exports = db.model("followup", followupSchema);
