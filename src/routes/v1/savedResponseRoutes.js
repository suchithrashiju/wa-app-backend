/**
 * Saved Response Routes
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 11, 2023
 * Description: Defines the routes for managing  saved response-related operations, such as creating, retrieving, updating, and deleting user saved response data.
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
const savedResponseController = require("../../controllers/savedResponseController");
const auth = require("../../middleware/authMiddleware");
const awaitHandlerFactory = require("../../middleware/awaitHandlerFactoryMiddleware");

//  Fetch all user savedResponses localhost:3003/api/v1/savedResponses
router.get(
  "/",
  auth(),
  awaitHandlerFactory(savedResponseController.getAllSavedResponses)
);

module.exports = router; // Export the router
