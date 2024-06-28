/**
 * Webhooks Routes
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 24, 2023
 * Description: Defines the routes for managing webhook-related operations, such as creating, retrieving, updating, and deleting user webhook data.
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
const webhookController = require("../../controllers/webhookController");
const auth = require("../../middleware/authMiddleware");
const awaitHandlerFactory = require("../../middleware/awaitHandlerFactoryMiddleware");

//  Fetch All webhooks - localhost:3003/api/v1/webhooks
router.post("/", awaitHandlerFactory(webhookController.handleWebhook));
router.get("/", awaitHandlerFactory(webhookController.verifyWebhook));

module.exports = router; // Export the router
