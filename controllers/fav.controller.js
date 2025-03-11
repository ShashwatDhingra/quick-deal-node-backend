const {
  sendResponse,
  getRequiredResponse,
  getInternalErrorResponse,
  getResponse,
} = require("../utils/utils");

const favServices = require("../services/Fav.service");
class FavController {
  // Create a new Property
  async addFav(req, res) {
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
      const response = await favServices.addFav(req.body);

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
  async updateFav(req, res) {
    try {
      const { id, ...updateData } = req.body;
      if (!id) {
        return sendResponse(res, getRequiredResponse("id"));
      }

      const response = await favServices.updateFav(id, updateData);

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

  // fetch property
  async fetchFav(req, res) {
    try {
      // Pagination and filtering parameters
      const { page, limit, ...filters } = req.query;

      const response = await favServices.fetchFav(page, limit, filters);

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
module.exports = new FavController();
