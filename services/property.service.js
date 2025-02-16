const userModel = require("../models/property_model");
const {
  sendResponse,
  getRequiredResponse,
  getInternalErrorResponse,
  getResponse,
} = require("../utils/utils");
const propertyModel = require("../models/property_model");
class PropertyServices {
  async addProperty(propertyData) {
    try {
      if (!propertyData) {
        return sendResponse(res, getRequiredResponse("Data is required"));
      }

      const { title, category, price, location } = propertyData;
      if (!title) {
        return sendResponse(res, getRequiredResponse("title"));
      }
      if (!category) {
        return sendResponse(res, getRequiredResponse("category"));
      }
      if (!price) {
        return sendResponse(res, getRequiredResponse("price"));
      }
      // Location validation
      if (!location) {
        return sendResponse(res, getRequiredResponse("location"));
      } else if (!location.address) {
        return sendResponse(res, getRequiredResponse("address"));
      } else if (!location.city) {
        return sendResponse(res, getRequiredResponse("city"));
      } else if (!location.state) {
        return sendResponse(res, getRequiredResponse("state"));
      } else if (!location.pincode) {
        return sendResponse(res, getRequiredResponse("pincode"));
      }
      // Coordinates validation
      if (
        !location.coordinates ||
        location.coordinates.lat == null ||
        location.coordinates.lng == null
      ) {
        return sendResponse(res, getRequiredResponse("lat or lng"));
      }
      const newProperty = await propertyModel({
        propertyData,
      });

      await newProperty.save();
      return getResponse(201, true, "Property added successfully", newProperty);
    } catch (e) {
      log(e.message);
      return getInternalErrorResponse(e.message || "An error occurred");
    }
  }
}

module.exports = new PropertyServices();
