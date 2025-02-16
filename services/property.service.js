const propertyModel = require("../models/property_model");
const { getResponse, getInternalErrorResponse } = require("../utils/utils");

class PropertyServices {
  async addProperty(propertyData) {
    try {
      const newProperty = new propertyModel(propertyData);

      await newProperty.save();

      return getResponse(201, true, "Property added successfully", newProperty);
    } catch (e) {
      // Return error response
      return getInternalErrorResponse(e.message || "An error occurred");
    }
  }
}

module.exports = new PropertyServices();
