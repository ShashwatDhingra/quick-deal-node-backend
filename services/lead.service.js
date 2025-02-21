const leadModel = require("../models/lead.model");
const {
  getResponse,
  getInternalErrorResponse,
  log,
} = require("../utils/utils");

class LeadServices {
  async addLead(leadData) {
    try {
      const newLead = new leadModel(leadData);

      await newLead.save();

      return getResponse(201, true, "Lead added successfully", newLead);
    } catch (e) {
      // Return error response
      return getInternalErrorResponse(e.message || "An error occurred");
    }
  }

  //   //Update property
  async updateLead(id, updatedLeadData) {
    try {
      const updatedLead = await leadModel.findByIdAndUpdate(
        id,
        { updatedAt: Date.now(), ...updatedLeadData },
        { new: true }
      );
      if (!updatedLead) {
        return getResponse(404, false, "Lead not found");
      }

      await updatedLead.save();
      return getResponse(200, true, "Lead updated successfully", updatedLead);
    } catch (e) {
      // Return error response
      return getInternalErrorResponse(e.message || "An error occurred");
    }
  }

  //   // fetch property
  async fetchLead(page, limit, filters) {
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

      const lead = await leadModel
        .find(filters["filters"])
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

      if (lead.length === 0) {
        return getResponse(404, false, "No Lead found");
      }

      return getResponse(200, true, "Lead fetched successfully", lead);
    } catch (e) {
      console.error("Error fetching Lead:", e);
      return getInternalErrorResponse(e.message || "An error occurred");
    }
  }
}

module.exports = new LeadServices();
