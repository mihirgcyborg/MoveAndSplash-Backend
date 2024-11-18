// services/placeAvailabilityService.js
const PlaceAvailability = require("../models/MongoDb/PlaceAvailability");

// Create availability
async function createAvailability(
  placeId,
  availabilityDate,
  startTime,
  endTime,
  isOpen
) {
  const newAvailability = new PlaceAvailability({
    placeId,
    availabilityDate,
    startTime,
    endTime,
    isOpen,
  });
  return await newAvailability.save();
}

// Get availability by place ID
async function getAvailabilityByPlaceId(placeId) {
  return await PlaceAvailability.find({ placeId })
    .sort({ availabilityDate: 1 })
    .exec();
}

module.exports = {
  createAvailability,
  getAvailabilityByPlaceId,
};
