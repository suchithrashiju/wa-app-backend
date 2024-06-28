/**
 * Template Routes
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 11, 2023
 * Description: Defines the routes for managing template-related operations, such as creating, retrieving, updating, and deleting user template data.
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
const templateController = require("../../controllers/templateController");
const auth = require("../../middleware/authMiddleware");
const awaitHandlerFactory = require("../../middleware/awaitHandlerFactoryMiddleware");

//  Fetch all user templates localhost:3003/api/v1/templates
router.get(
  "/",
  auth(),
  awaitHandlerFactory(templateController.getAllTemplates)
);

router.post(
  "/refresh/issue",
  auth(),
  awaitHandlerFactory(templateController.refreshTemplate)
);

router.get(
  "/refresh/status",
  auth(),
  awaitHandlerFactory(templateController.getRefreshTemplateStatus)
);

module.exports = router; // Export the router
