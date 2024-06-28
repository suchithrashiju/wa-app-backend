/**
 * Tags Routes
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 10, 2023
 * Description: Defines the routes for managing tag-related operations, such as creating, retrieving, updating, and deleting user tag data.
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
const tagController = require("../../controllers/tagController");
const auth = require("../../middleware/authMiddleware");
const awaitHandlerFactory = require("../../middleware/awaitHandlerFactoryMiddleware");

// Fetch All tags - localhost:3003/api/v1/tags
router.get("/", auth(), awaitHandlerFactory(tagController.getAllTags));

module.exports = router; // Export the router
