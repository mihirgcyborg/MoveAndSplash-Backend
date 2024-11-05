// controllers/messagesController.js
const messagesService = require("../services/messagesService");

// 1. Send a Message
async function sendMessage(req, res) {
  const { senderId, recipientId, message } = req.body;
  const timestamp = Date.now();

  try {
    await messagesService.sendMessage(
      senderId,
      recipientId,
      message,
      timestamp
    );
    res.status(201).json({ message: "Message sent successfully." });
  } catch (error) {
    res.status(500).json({ error: "Error sending message." });
  }
}

// 2. Get Messages Between Users
async function getMessages(req, res) {
  const { senderId, recipientId } = req.params;

  try {
    const messages = await messagesService.getMessages(senderId, recipientId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: "Error fetching messages." });
  }
}

module.exports = {
  sendMessage,
  getMessages,
};
