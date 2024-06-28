/**
 * Chat Assignment Event Routes
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 18, 2023
 * Description: Chat Assignment Event Routes: Handles assigning and managing chat conversations to agents.
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
const chatAssignmentEventController = require("../../controllers/chatAssignmentEventController");
const auth = require("../../middleware/authMiddleware");
const awaitHandlerFactory = require("../../middleware/awaitHandlerFactoryMiddleware");

//  Fetch all user chat Assignment Events localhost:3003/api/v1/chat_assignment_events
router.get(
  "/",
  auth(),
  awaitHandlerFactory(chatAssignmentEventController.getAllChatAssignmentEvents)
);

module.exports = router; // Export the router
