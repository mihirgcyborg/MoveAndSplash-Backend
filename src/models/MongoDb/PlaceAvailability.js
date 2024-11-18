const mongoose = require("mongoose");

const placeAvailabilitySchema = new mongoose.Schema({
  placeId: { type: String, required: true },
  availabilityDate: { type: Date, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  isOpen: { type: Boolean, default: true },
});

module.exports = mongoose.model("PlaceAvailability", placeAvailabilitySchema);
