/**
 * Person Routes
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 14, 2023
 * Description: Express routes for managing person data.
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
const personController = require("../../controllers/personController");
const auth = require("../../middleware/authMiddleware");
const awaitHandlerFactory = require("../../middleware/awaitHandlerFactoryMiddleware");

//Fetch all persons localhost:3003/api/v1/persons
router.get("/", auth(), personController.getAllPersons);

// Define the route to handle the GET request for retrieving chat by waId
router.get(
  "/:waId",
  auth(),
  awaitHandlerFactory(personController.getPersonDetailByWAId)
);

//Export the router
module.exports = router;
