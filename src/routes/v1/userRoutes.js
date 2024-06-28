/**
 * User Routes
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 8, 2023
 * Description: Defines the routes for managing user-related operations, such as creating, retrieving, updating, and deleting user data.
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
const userController = require("../../controllers/userController");
const auth = require("../../middleware/authMiddleware");
const Role = require("../../utils/userRolesUtils");
const awaitHandlerFactory = require("../../middleware/awaitHandlerFactoryMiddleware");

// Import the createUserSchema,updateUserSchema,validateLogin function from the userValidatorMiddleware module
const {
  createUserSchema,
  updateUserSchema,
  validateLogin,
} = require("../../middleware/validators/userValidatorMiddleware");

router.get("/", auth(), awaitHandlerFactory(userController.getAllUsers)); // Get all users - localhost:3003/api/v1/users

router.get("/id/:id", auth(), awaitHandlerFactory(userController.getUserById)); // Get user by ID - localhost:3003/api/v1/users/id/1

router.get(
  "/username/:username",
  auth(),
  awaitHandlerFactory(userController.getUserByuserName)
); // Get user by username - localhost:3003/api/v1/users/usersname/julia

router.get(
  "/current",
  auth(),
  awaitHandlerFactory(userController.getCurrentUser)
); // Get current user - localhost:3003/api/v1/users/current

router.put(
  "/password/change",
  auth(),
  awaitHandlerFactory(userController.changePassword)
); // Change password by loggined user - localhost:3003/api/v1/users/password/change

router.post(
  "/",
  createUserSchema,
  awaitHandlerFactory(userController.createUser)
); // Create a new user - localhost:3003/api/v1/users/createUserSchema

router.patch(
  "/id/:id",
  auth(Role.Admin),
  updateUserSchema,
  awaitHandlerFactory(userController.updateUser)
); // Update user by ID (partial update) - localhost:3003/api/v1/users/id/1

router.delete(
  "/id/:id",
  auth(Role.Admin),
  awaitHandlerFactory(userController.deleteUser)
); // Delete user by ID - localhost:3003/api/v1/users/id/1

router.post(
  "/login",
  validateLogin,
  awaitHandlerFactory(userController.userLogin)
); // User login - localhost:3003/api/v1/users/login

module.exports = router; // Export the router
