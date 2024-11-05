// db/prismaClient.js
const { PrismaClient } = require("@prisma/client");

// Create Prisma client instance
const prisma = new PrismaClient();

module.exports = { prisma };
