const mongoose = require("mongoose");
const db = require("../config/db");

const { currentTime } = require("../utils/utils");
const followupSchema = mongoose.Schema({
  name: {type: String, require: true},
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
  followUpDate: { type: Date, default: currentTime() },
  followUpBy: { type: String, required: true }, // User ID
  property: { type: String, required: true }, // Property ID
  reminder: { type: Boolean, default: true },
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
