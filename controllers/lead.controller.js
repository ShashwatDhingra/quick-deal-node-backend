const {
  sendResponse,
  getRequiredResponse,
  getInternalErrorResponse,
  getResponse,
} = require("../utils/utils");

const leadServices = require("../services/lead.service");
class LeadController {
  // Create a new Property
  async addLead(req, res) {
    try {
      const { name, phone } = req.body;
      if (!name) {
        return sendResponse(res, getRequiredResponse("name"));
      }
      if (!phone) {
        return sendResponse(res, getRequiredResponse("phone"));
      }

      const response = await leadServices.addLead(req.body);

      return sendResponse(res, response);
    } catch (e) {
      console.error(`Controller load error: ${e.message}`);
      return sendResponse(
        res,
        getInternalErrorResponse(
          e.message || "An error occurred while adding property"
        )
      );
    }
  }

  // Update status
  async updateLead(req, res) {
    try {
      const { id, ...updateData } = req.body;
      if (!id) {
        return sendResponse(res, getRequiredResponse("id"));
      }

      const response = await leadServices.updateLead(id, updateData);

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
  async fetchLead(req, res) {
    try {
      // Pagination and filtering parameters
      const { page, limit, ...filters } = req.query;

      const response = await leadServices.fetchLead(page, limit, filters);

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
module.exports = new LeadController();
