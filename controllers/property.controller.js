const {
  sendResponse,
  getRequiredResponse,
  getInternalErrorResponse,
  getResponse,
} = require("../utils/utils");

const propertyServices = require("../services/property.service");
class PropertyController {
  // Create a new Property
  async addProperty(req, res) {
    try {
      const response = await propertyServices.addProperty(req.body);

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
}
module.exports = new PropertyController();
