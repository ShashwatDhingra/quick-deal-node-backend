const express = require("express");
const router = express.Router();
const FollowupController = require("../controllers/followup.controller");

router.post("/create-followup", FollowupController.addFollowup);
// // Update property record
router.post("/update-followup", FollowupController.updateFollowup);
// //get the property list
router.get("/fetch-followup", FollowupController.fetchFollowup);

module.exports = router;
