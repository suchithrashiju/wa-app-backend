/**
 * Chat Routes
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 11, 2023
 * Description: Defines the routes for managing  chat-related operations, such as creating, retrieving, updating, and deleting user chat data.
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
const chatController = require("../../controllers/chatController");
const auth = require("../../middleware/authMiddleware");
const awaitHandlerFactory = require("../../middleware/awaitHandlerFactoryMiddleware");

//  Fetch all user chats localhost:3003/api/v1/chats
router.get("/", auth(), awaitHandlerFactory(chatController.getAllChats));

// Define the route to handle GET request for retrieving chat by waId
router.get("/:waId", auth(), awaitHandlerFactory(chatController.getChatByWAId));

// router.get("/", auth(), awaitHandlerFactory(chatController.sendTestMessage));

module.exports = router; // Export the router
