const mongoose = require("mongoose");

async function connectMongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to MongoDB successfully");
  } catch (error) {
    console.log("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}
module.exports = connectMongoDB;
