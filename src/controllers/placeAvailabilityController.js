const placeAvailabilityService = require("../services/placeAvailabilityService");

async function createAvailability(req, res) {
  const { placeId, availabilityDate, startTime, endTime, isOpen } = req.body;
  console.log(placeId, availabilityDate, startTime, endTime, isOpen);
  try {
    await placeAvailabilityService.createAvailability(
      placeId,
      availabilityDate,
      startTime,
      endTime,
      isOpen
    );
    res
      .status(201)
      .json({ message: "Place availability created successfully." });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error creating availability." });
  }
}
async function getAvailability(req, res) {
  const { placeId } = req.params;

  try {
    const availability =
      await placeAvailabilityService.getAvailabilityByPlaceId(placeId);
    res.status(200).json(availability);
  } catch (error) {
    res.status(500).json({ error: "Error fetching availability." });
  }
}

module.exports = {
  createAvailability,
  getAvailability,
};
