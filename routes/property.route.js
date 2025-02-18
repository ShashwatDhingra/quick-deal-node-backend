const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/property.controller");

router.post("/create-property", propertyController.addProperty);
// Update property record
router.post("/update-property", propertyController.updateProperty);

module.exports = router;
