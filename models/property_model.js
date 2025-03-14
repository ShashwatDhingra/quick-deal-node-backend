const mongoose = require("mongoose");
const db = require("../config/db");

const { currentTime } = require("../utils/utils");
const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: Number, required: true },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
  },
  status: { type: [String], required: true },
  area: { type: String },
  furnishing: { type: String },
  bedrooms: { type: Number },
  bathrooms: { type: Number },
  balconies: { type: Number },
  parking: { type: Boolean, default: false },
  floorNumber: { type: Number },
  totalFloors: { type: Number },
  constructionYear: { type: Number },
  ownershipType: { type: String },
  amenities: [{ type: String }],
  images: [{ type: String }],
  videoTour: { type: String },
  propertyType: { type: String },
  maintenanceCost: { type: Number },
  nearestLandmark: { type: String },
  facingDirection: { type: String },
  wishlistedBy: {
    type: [mongoose.Schema.Types.ObjectId], // Array of ObjectIds
    validate: {
      validator: function (array) {
        // Check if the array has duplicates
        return new Set(array.map((id) => id.toString())).size === array.length;
      },
      message: "wishlistedBy array must contain unique user IDs.",
    },
  },
  legalClearance: { type: Boolean, default: false },
  availableFrom: { type: Date },

  createdAt: {
    type: Date,
    default: currentTime(),
  },
  updatedAt: { type: Date, default: currentTime() },
});

propertySchema.statics.findByName = function (title) {
  return this.find({ title: new RegExp(`.*${title}.*`, "i") });
};

propertySchema.statics.findByName = function (title) {
  return this.find({ title: { $regex: `.*${title}.*`, $options: "i" } });
};

// Middleware to enforce required fields during updates for followup array

module.exports = db.model("Property", propertySchema);
