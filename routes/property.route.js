const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/property.controller");

router.post("/create-property", propertyController.addProperty);
// Update property record
router.post("/update-property", propertyController.updateProperty);
//get the property list
router.get("/fetch-property", propertyController.fetchProperty);

module.exports = router;
