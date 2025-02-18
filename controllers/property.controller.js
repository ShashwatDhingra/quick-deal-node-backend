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
      const { title, category, price, location } = req.body;
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
      }
      if (!location.address) {
        return sendResponse(res, getRequiredResponse("address"));
      }
      if (!location.city) {
        return sendResponse(res, getRequiredResponse("city"));
      }
      if (!location.state) {
        return sendResponse(res, getRequiredResponse("state"));
      }
      if (!location.pincode) {
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

  // Update status
  async updateProperty(req, res) {
    try {
      const { id, ...updateData } = req.body;
      if (!id) {
        return sendResponse(res, getRequiredResponse("id"));
      }

      for (const key in updateData) {
        if (updateData.hasOwnProperty(key)) {
          if (!updateData[key] || updateData[key].toString().trim() === "") {
            return sendResponse(res, getRequiredResponse(`${key}`));
          }
        }
      }

      const response = await propertyServices.updateProperty(id, updateData);

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
}
module.exports = new PropertyController();
