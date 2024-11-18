const app = require("./app");
const { prisma } = require("./db/prismaClient");
const connectMongoDB = require("./db/mongoDbClient");
const PORT = process.env.PORT || 5000;

async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log("Connected to MySQL database successfully.");
  } catch (error) {
    console.error("Error connecting to MySQL database:", error);
    process.exit(1);
  }
}

// Start the server
async function startServer() {
  await connectDatabase();
  await connectMongoDB();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Start the application
startServer();
