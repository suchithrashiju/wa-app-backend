/**
 * Chat Controller
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 11, 2023
 * Description: Handles chat-related operations
 * 
 * 
 //The Date and Changes made sections are duplicated in each updated comment entry
 * Last Updated: 
 * 
 * Changes:
 * 
 * Date: 
 * Functions: 
 * // Changed Function Names
 * - 
 * 
 * Changes Made:
 * // Changes
 * - 
 */

// Import necessary dependencies and models
const chatService = require("../services/chatService");
const commonHelper = require("../helpers/commonHelper");
const messageHelper = require("../helpers/messageHelper");
const webhookService = require("../services/webhookService");
const { checkAndAddCountryCode } = require("../utils/commonUtils");

const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              Chat Controller
 *****************************************************************************/
// Test send message
sendTestMessage = async (req, res) => {
  console.log("Test message");
  console.log(process.env.RECIPIENT_WAID);
  var data = messageHelper.getTextMessageInput(
    process.env.RECIPIENT_WAID,
    "Welcome to the Ginger Technologies - CRM Business Whatsapp !"
  );
  messageHelper
    .sendMessage(data)
    .then((response) => {
      // Handle the success response
      console.log("Message sent successfully:", response.data);
    })
    .catch((error) => {
      // Handle the error
      console.error("Error sending message:", error.message);
    });
};

// get all chats
getAllChats = async (req, res) => {
  try {
    const chats = await chatService.getAllChatResults(req);
    res.send(chats);
  } catch (error) {
    res.status(error.status || 500).send({
      status: "Getting all chats FAILED",
      data: error.message || error,
    });
  }
};

// Controller function to handle GET request to retrieve chat by chatId
getChatByWAId = async (req, res) => {
  try {
    const chatWAId = req.params.waId;
    // Call the service function to get the chat by chatId
    const WAId = checkAndAddCountryCode(chatWAId);
    const chatResult = await webhookService.getLastMessageDetailByWAId(WAId);
    res.send(chatResult);
  } catch (error) {
    res.status(error.status || 500).send({
      status: "Getting chats Chat WAId FAILED",
      data: error.message || error,
    });
  }
};

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = {
  getAllChats,
  getChatByWAId,
  sendTestMessage,
};
