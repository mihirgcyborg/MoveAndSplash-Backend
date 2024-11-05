const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const placeAvailabilityRoutes = require("./routes/placeAvailabilityRoutes");
const messagesRoutes = require("./routes/messageRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

// Middlerware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/place-availablity", placeAvailabilityRoutes);
app.use("/api/messages", messagesRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Resource not found" });
});

app.use((err, req, res, next) => {
  // console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

module.exports = app;
