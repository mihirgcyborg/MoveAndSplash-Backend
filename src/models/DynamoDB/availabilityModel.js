const dynamoDb = require("../../utils/awsConfig");

const TABLE_NAME = "PlaceAvailability";

async function updateAvailability(availabilityData) {
  const params = {
    TableName: TABLE_NAME,
    Item: availabilityData, // Data should contain placeId, date, timeSlot, and status (open/close)
  };
  return await dynamoDb.put(params).promise();
}

async function getAvailabilityByPlaceId(placeId) {
  const params = {
    TableName: TABLE_NAME,
    KeyConditionExpression: "placeId = :placeId",
    ExpressionAttributeValues: {
      ":placeId": placeId,
    },
  };
  return await dynamoDb.query(params).promise();
}

module.exports = { updateAvailability, getAvailabilityByPlaceId };
