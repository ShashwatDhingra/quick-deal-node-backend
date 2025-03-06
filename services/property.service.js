const propertyModel = require("../models/property_model");
const {
  getResponse,
  getInternalErrorResponse,
  log,
} = require("../utils/utils");

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

  // fetch property
  async fetchProperty(page, limit, filters) {
    try {
      if (page < 1 || limit < 1) {
        return getResponse(
          400,
          false,
          "Page and limit must be positive integers"
        );
      }

      if (filters["filters"]) {
        Object.keys(filters["filters"]).forEach((key) => {
          let value = filters["filters"][key];

          if (typeof value === "object" && value !== null) {
            Object.keys(value).forEach((operator) => {
              if (
                ["gte", "lte", "gt", "lt"].includes(operator) &&
                !isNaN(Date.parse(value[operator]))
              ) {
                value[`$${operator}`] = new Date(value[operator]);
                console.error(`Error fetching Lead:${value[`$${operator}`]}`);
                delete value[operator];
              }
            });
          } else if (typeof value === "string" && !isNaN(Date.parse(value))) {
            filters["filters"][key] = new Date(value);
          } else if (typeof value === "string") {
            filters["filters"][key] = { $regex: value, $options: "i" };
          } else if (typeof value === "number") {
            filters["filters"][key] = { $eq: value };
          }
        });
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

module.exports = new PropertyServices();
