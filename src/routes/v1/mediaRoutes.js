/**
 * Media Routes
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 18, 2023
 * Description: Defines the routes for managing  media-related operations, such as creating, retrieving, updating, and deleting user media data.
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
const mediaController = require("../../controllers/mediaController");
const auth = require("../../middleware/authMiddleware");
const awaitHandlerFactory = require("../../middleware/awaitHandlerFactoryMiddleware");

//  Fetch all user media localhost:3003/api/v1/media
router.get(
  "/",
  auth(),
  awaitHandlerFactory(mediaController.getAllMediaDetails)
);
router.get("/:id", awaitHandlerFactory(mediaController.getMediaDetail));
router.post(
  "/",
  auth(),
  awaitHandlerFactory(mediaController.uploadAndSendMedia)
);

module.exports = router; // Export the router