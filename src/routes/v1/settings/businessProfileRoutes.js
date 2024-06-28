/**
 * Business Profile Router
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 12, 2023
 * Description: Defines the managing business profile - related operations. such as creating, retrieving, updating and deleting business profile data.
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

// Import the dependencies and models

const express = require("express");
const router = express.Router();
const businessProfileController = require("../../../controllers/settings/businessProfileController");
const auth = require("../../../middleware/authMiddleware");
const awaitHandlerFactory = require("../../../middleware/awaitHandlerFactoryMiddleware");

// Fetch business profile data localhost:3003/api/v1/settings/business/profile
router.get(
  "/profile",
  auth(),
  awaitHandlerFactory(businessProfileController.getBusinessProfileDetail)
);

// Update business profile data localhost:3003/api/v1/settings/business/profile
router.patch(
  "/profile",
  auth(),
  awaitHandlerFactory(businessProfileController.updateBusinessProfile)
);

// Fetch business profile verticals  localhost:3003/api/v1/settings/business/verticals
router.get(
  "/verticals",
  auth(),
  awaitHandlerFactory(businessProfileController.getBusinessVerticals)
);

// Export the router
module.exports = router;
