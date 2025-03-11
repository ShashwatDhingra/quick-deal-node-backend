const propertyModel = require("../models/property_model");
const {
  getResponse,
  getInternalErrorResponse,
  log,
} = require("../utils/utils");

class FavServices {
  async addFav(propertyData) {
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
  async updateFav(id, updatedPropertyData) {
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

  // fetch property
  async fetchFav(page, limit, filters) {
    try {
      const query = {};

      if (filters) {
        console.log(`service property from ${JSON.stringify(filters)}`);
        for (const key in filters["filters"]) {
          if (typeof filters[key] === "string") {
            filters["filters"] = {
              $regex: filters["filters"][key],
              $options: "i",
            };
          }
        }
      }

      if (page < 1 || limit < 1) {
        return getResponse(
          400,
          false,
          "Page and limit must be positive integers"
        );
      }

      log(filters["filters"]);

      const properties = await propertyModel
        .find(filters["filters"])
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

      return getResponse(
        200,
        true,
        "Properties fetched successfully",
        properties
      );
    } catch (e) {
      // Log the error for debugging purposes
      console.error("Error fetching properties:", e);

      // Return error response
      return getInternalErrorResponse(e.message || "An error occurred");
    }
  }
}

module.exports = new FavServices();
