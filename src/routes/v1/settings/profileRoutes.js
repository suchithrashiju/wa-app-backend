/**
 * Profile Router
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 12, 2023
 * Description: Defines the managing  profile - related operations. such as creating, retrieving, updating and deleting  profile data.
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
const profileController = require("../../../controllers/settings/profileController");
const auth = require("../../../middleware/authMiddleware");
const awaitHandlerFactory = require("../../../middleware/awaitHandlerFactoryMiddleware");

// Fetch profile data localhost:3003/api/v1/settings/profile
router.get(
  "/",
  auth(),
  awaitHandlerFactory(profileController.getProfileDetail)
);

router.get(
  "/about",
  auth(),
  awaitHandlerFactory(profileController.getProfileAboutDetail)
);

router.get(
  "/photo",
  auth(),
  awaitHandlerFactory(profileController.getProfilePhoto)
);

router.post(
  "/photo",
  auth(),
  awaitHandlerFactory(profileController.updateProfilePhoto)
);

router.delete(
  "/photo",
  auth(),
  awaitHandlerFactory(profileController.deleteProfilePhoto)
);

// Update business profile data localhost:3003/api/v1/settings/business/profile
router.patch(
  "/about",
  auth(),
  awaitHandlerFactory(profileController.updateProfileAbout)
);

// Export the router
module.exports = router;
