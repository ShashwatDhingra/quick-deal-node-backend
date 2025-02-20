const express = require("express");
const router = express.Router();
const path = require("path");
const { getNotFoundResponse } = require("../utils/utils");

// Middleware to handle dynamic controllers
router.use("/:module", async (req, res, next) => {
  try {
    const { module } = req.params;
    const controllerPath = path.join(
      __dirname,
      `../controllers/${module}.controller.js`
    );

    let controller;
    try {
      // Dynamically import the controller
      controller = require(controllerPath);
    } catch (err) {
      console.error(`Controller load error: ${err.message}`);

      return res.status(404).json({ message: "controller not found " });
    }

    // Map HTTP methods to controller functions
    const method = req.method.toLowerCase(); // Get HTTP method in lowercase
    const actionMap = {
      post: "add" + module.charAt(0).toUpperCase() + module.slice(1),
      put: "update" + module.charAt(0).toUpperCase() + module.slice(1),
      get: "fetch" + module.charAt(0).toUpperCase() + module.slice(1),
    };

    const action = actionMap[method];

    if (controller[action]) {
      try {
        return controller[action](req, res, next);
      } catch (err) {
        return next(err);
      }
    } else {
      return getNotFoundResponse(405, true, "Method not found");
    }
  } catch (error) {
    return getInternalErrorResponse(e.message || "An error occurred");
    //next(error);
  }
});

module.exports = router;
