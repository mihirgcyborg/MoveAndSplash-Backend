// services/messagesService.js
const Message = require("../models/MongoDb/Message");

// Send a message
async function sendMessage(senderId, recipientId, message, timestamp) {
  const newMessage = new Message({ senderId, recipientId, message, timestamp });
  return await newMessage.save();
}

// Get messages between users
async function getMessages(senderId, recipientId) {
  return await Message.find({ senderId, recipientId })
    .sort({ timestamp: 1 })
    .exec();
}

module.exports = {
  sendMessage,
  getMessages,
};
