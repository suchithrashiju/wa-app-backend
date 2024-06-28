/**
 * Mark As Received Routes
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 18, 2023
 * Description: Defines the routes for managing  mark as received-related operations.
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
const markAsReceivedController = require("../../controllers/markAsReceivedController");
const auth = require("../../middleware/authMiddleware");
const awaitHandlerFactory = require("../../middleware/awaitHandlerFactoryMiddleware");

//   localhost:3003/api/v1/mark_as_received
router.post(
  "/",
  auth(),
  awaitHandlerFactory(markAsReceivedController.getAllMarkAsReceivedData)
);

module.exports = router; // Export the router
