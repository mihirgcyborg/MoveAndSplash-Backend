// db/prismaClient.js
const { PrismaClient } = require("@prisma/client");

// Create Prisma client instance
const prisma = new PrismaClient();

async function testDatabaseConnection() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully.");
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
}

// Run this once to test the connection when starting the app
testDatabaseConnection();

module.exports = { prisma };
