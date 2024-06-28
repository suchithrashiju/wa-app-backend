/**
 * Message Routes
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 17, 2023
 * Description: Defines the routes for managing  message-related operations, such as creating, retrieving, updating, and deleting user message data.
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

// Import necessary dependencies
const express = require("express");
const router = express.Router();
const messageController = require("../../controllers/messageController");
const auth = require("../../middleware/authMiddleware");
const awaitHandlerFactory = require("../../middleware/awaitHandlerFactoryMiddleware");

//  Fetch all user messages localhost:3003/api/v1/messages
router.get("/", auth(), awaitHandlerFactory(messageController.getAllMessages));
router.post(
  "/",
  auth(),
  awaitHandlerFactory(messageController.sendChatMessage)
);

module.exports = router; // Export the router
