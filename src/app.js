const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
});
const placeAvailabilityRoutes = require("./routes/placeAvailabilityRoutes");
const messagesRoutes = require("./routes/messageRoutes");
const authRoutes = require("./routes/authRoutes");
const passport = require("./strategies/passport");
const app = express();
const session = require("express-session");

// Middlerware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(
  session({
    secret: "your_secret_key", // Replace with a strong secret in production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Use `secure: true` if serving over HTTPS
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/place-availablity", placeAvailabilityRoutes);
app.use("/api/messages", messagesRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Resource not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

module.exports = app;
