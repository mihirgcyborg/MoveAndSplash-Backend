// routes/messagesRoutes.js
const express = require("express");
const router = express.Router();
const messagesController = require("../controllers/messagesController");

// POST: Send a Message
router.post("/", messagesController.sendMessage);

// GET: Get Messages Between Users
router.get("/:senderId/:recipientId", messagesController.getMessages);

module.exports = router;
