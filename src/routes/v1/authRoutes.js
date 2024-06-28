/**
 * Auth Routes
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 8, 2023
 * Description: Defines the authentication-related routes for user registration, login, and logout.
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
const authController = require("../../controllers/authController");
const awaitHandlerFactory = require("../../middleware/awaitHandlerFactoryMiddleware");

// Import the validateLogin function from the userValidatorMiddleware module
const {
  validateLogin,
} = require("../../middleware/validators/userValidatorMiddleware");

// Route for obtaining an authentication token
router.post(
  "/token",
  validateLogin, // Middleware for validating login credentials
  awaitHandlerFactory(authController.getAuthToken) // Async request handler for getting the authentication token
); // Endpoint: localhost:3003/api/v1/auth/token

// Route for logging out
router.post(
  "/logout",
  validateLogin, // Middleware for validating login credentials
  awaitHandlerFactory(authController.getLogout) // Async request handler for logging out
); // Endpoint: localhost:3003/api/v1/auth/logout

module.exports = router; // Export the router
