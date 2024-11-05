const { prisma } = require("../db/prismaClient");
const { dynamoDbClient } = require("../db/dynamoDbClient");
const { PutItemCommand, QueryCommand } = require("@aws-sdk/client-dynamodb");

const TABLE_NAME = "PlaceAvailability";

async function createAvailability(
  placeId,
  availabilityDate,
  startTime,
  endTime,
  isOpen
) {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      placeId: { S: placeId },
      availabilityDate: { S: availabilityDate },
      startTime: { S: startTime },
      endTime: { S: endTime },
      isOpen: { BOOL: isOpen },
    },
  };
  const command = new PutItemCommand(params);
  return await dynamoDbClient.send(command);
}

async function getAvailabilityByPlaceId(placeId) {
  const params = {
    TableName: TABLE_NAME,
    KeyConditionExpression: "placeId = :p",
    ExpressionAttributeValues: {
      ":p": { S: placeId },
    },
  };

  const command = new QueryCommand(params);
  const result = await dynamoDbClient.send(command);
  return result.Items || [];
}

module.exports = {
  createAvailability,
  getAvailabilityByPlaceId,
};
