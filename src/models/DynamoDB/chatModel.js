const dynamoDb = require("../../utils/awsConfig");

const TABLE_NAME = "ChatMessages";

async function saveMessage(messageData) {
  const params = {
    TableName: TABLE_NAME,
    Item: messageData,
  };
  return await dynamoDb.put(params).promise();
}

async function getMessagesByBookingId(bookingId) {
  const params = {
    TableName: TABLE_NAME,
    KeyConditionExpression: "bookingId = :bookingId",
    ExpressionAttributeValues: {
      ":bookingId": bookingId,
    },
  };
  return await dynamoDb.query(params).promise();
}

module.exports = { saveMessage, getMessagesByBookingId };
