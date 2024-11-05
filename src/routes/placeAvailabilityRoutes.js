const express = require("express");
const router = express.Router();
const placeAvailabilityController = require("../controllers/placeAvailabilityController");

router.post("/", placeAvailabilityController.createAvailability);

router.get("/:placeId", placeAvailabilityController.getAvailability);

module.exports = router;
