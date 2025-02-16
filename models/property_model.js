const mongoose = require("mongoose");
const db = require('../config/db')

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
  status: { type: String, default: "draft" },
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
  legalClearance: { type: Boolean, default: false },
  availableFrom: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = db.model("Property", propertySchema);
