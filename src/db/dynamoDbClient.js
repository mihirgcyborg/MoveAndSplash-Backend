// db/dynamoDbClient.js
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

// Create DynamoDB client instance
const dynamoDbClient = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

module.exports = { dynamoDbClient };
