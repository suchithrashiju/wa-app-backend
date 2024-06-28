/**
 * Contact Routes
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 11, 2023
 * Description: Defines the routes for managing  contact-related operations, such as creating, retrieving, updating, and deleting user contact data.
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
const contactController = require("../../controllers/contactController");
const auth = require("../../middleware/authMiddleware");
const awaitHandlerFactory = require("../../middleware/awaitHandlerFactoryMiddleware");

//  Fetch all user contacts localhost:3003/api/v1/contacts
router.get("/", auth(), awaitHandlerFactory(contactController.getAllContacts));
router.get(
  "/:waId",
  auth(),
  awaitHandlerFactory(contactController.getAllContactsByWaId)
);
// Verifies given contacts localhost:3003/api/v1/contacts/verify
router.post(
  "/verify",
  auth(),
  awaitHandlerFactory(contactController.getVerifyContacts)
);

module.exports = router; // Export the router
