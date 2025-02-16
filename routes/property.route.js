const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/property.controller");

router.post("/create-property", propertyController.addProperty);
module.exports = router;
