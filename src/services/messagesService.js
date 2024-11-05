// services/messagesService.js
const { dynamoDbClient } = require("../db/dynamoDbClient");
const { PutItemCommand, QueryCommand } = require("@aws-sdk/client-dynamodb");

const MESSAGES_TABLE = "ChatMessages";

// 1. Send a Message
async function sendMessage(senderId, recipientId, message, timestamp) {
  const params = {
    TableName: MESSAGES_TABLE,
    Item: {
      messageId: { S: `${senderId}-${recipientId}-${timestamp}` },
      senderId: { S: senderId },
      recipientId: { S: recipientId },
      message: { S: message },
      timestamp: { N: timestamp.toString() },
    },
  };

  const command = new PutItemCommand(params);
  return await dynamoDbClient.send(command);
}

// 2. Get Messages by User IDs
async function getMessages(senderId, recipientId) {
  const params = {
    TableName: MESSAGES_TABLE,
    KeyConditionExpression: "senderId = :s AND recipientId = :r",
    ExpressionAttributeValues: {
      ":s": { S: senderId },
      ":r": { S: recipientId },
    },
  };

  const command = new QueryCommand(params);
  const result = await dynamoDbClient.send(command);
  return result.Items || [];
}

module.exports = {
  sendMessage,
  getMessages,
};
