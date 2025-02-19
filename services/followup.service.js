const followupModel = require("../models/followup.model");
const {
  getResponse,
  getInternalErrorResponse,
  log,
} = require("../utils/utils");

class FollowupServices {
  async addFollowup(followupData) {
    try {
      const newFollowup = new followupModel(followupData);

      await newFollowup.save();

      return getResponse(201, true, "Followup added successfully", newFollowup);
    } catch (e) {
      // Return error response
      return getInternalErrorResponse(e.message || "An error occurred");
    }
  }

  //   //Update property
  async updateFollowup(id, updatedFollowupData) {
    try {
      const updatedFollowup = await followupModel.findByIdAndUpdate(
        id,
        { updatedAt: Date.now(), ...updatedFollowupData },
        { new: true }
      );
      if (!updatedFollowup) {
        return getResponse(404, false, "Followup not found");
      }

      await updatedFollowup.save();
      return getResponse(
        200,
        true,
        "Followup updated successfully",
        updatedFollowup
      );
    } catch (e) {
      // Return error response
      return getInternalErrorResponse(e.message || "An error occurred");
    }
  }

  //   // fetch property
  async fetchFollowup(page, limit, filters) {
    try {
      if (page < 1 || limit < 1) {
        return getResponse(
          400,
          false,
          "Page and limit must be positive integers"
        );
      }

    //   log(filters["filters"]);

      const followup = await followupModel
        .find(filters["filters"])
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

      if (followup.length === 0) {
        return getResponse(404, false, "No followup found");
      }

      return getResponse(
        200,
        true,
        "Followup fetched successfully",
        followup
      );
    } catch (e) {
      // Log the error for debugging purposes
      console.error("Error fetching properties:", e);

      // Return error response
      return getInternalErrorResponse(e.message || "An error occurred");
    }
  }
}

module.exports = new FollowupServices();
