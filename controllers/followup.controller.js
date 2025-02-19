const {
  sendResponse,
  getRequiredResponse,
  getInternalErrorResponse,
  getResponse,
} = require("../utils/utils");

const followupServices = require("../services/followup.service");
class FollowupController {
  // Create a new Property
  async addFollowup(req, res) {
    try {
      const {
        followUpBy,
        property,
        comments,
        priority,
        followUpType,
        reminderDate,
      } = req.body;
      if (!followUpBy) {
        return sendResponse(res, getRequiredResponse("followUpBy"));
      }
      if (!property) {
        return sendResponse(res, getRequiredResponse("property"));
      }
      if (!comments) {
        return sendResponse(res, getRequiredResponse("prcommentsice"));
      }
      if (!priority) {
        return sendResponse(res, getRequiredResponse("priority"));
      }

      if (!followUpType) {
        return sendResponse(res, getRequiredResponse("followUpType"));
      }
      if (!reminderDate) {
        return sendResponse(res, getRequiredResponse("reminderDate"));
      }

      const response = await followupServices.addFollowup(req.body);

      return sendResponse(res, response);
    } catch (e) {
      return sendResponse(
        res,
        getInternalErrorResponse(
          e.message || "An error occurred while adding property"
        )
      );
    }
  }

  // Update status
  async updateFollowup(req, res) {
    try {
      const { id, ...updateData } = req.body;
      if (!id) {
        return sendResponse(res, getRequiredResponse("id"));
      }

      const response = await followupServices.updateFollowup(id, updateData);

      return sendResponse(res, response);
    } catch (e) {
      return sendResponse(
        res,
        getInternalErrorResponse(
          e.message || "An error occurred while updating property"
        )
      );
    }
  }

  // // fetch property
  async fetchFollowup(req, res) {
    try {
      // Pagination and filtering parameters
      const { page, limit, ...filters } = req.query;

      const response = await followupServices.fetchFollowup(
        page,
        limit,
        filters
      );

      return sendResponse(res, response);
    } catch (e) {
      return sendResponse(
        res,
        getInternalErrorResponse(
          e.message || "An error occurred while fetching property"
        )
      );
    }
  }
}
module.exports = new FollowupController();
