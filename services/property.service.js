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

  //Update property
  async updateProperty(id, updatedPropertyData) {
    try {
      const updatedProperty = await propertyModel.findByIdAndUpdate(
        id,
        { updatedAt: Date.now(), ...updatedPropertyData },
        { new: true }
      );
      if (!updatedProperty) {
        return getResponse(404, false, "Property not found");
      }

      await updatedProperty.save();
      return getResponse(
        200,
        true,
        "Property updated successfully",
        updatedProperty
      );
    } catch (e) {
      // Return error response
      return getInternalErrorResponse(e.message || "An error occurred");
    }
  }
}

module.exports = new PropertyServices();
