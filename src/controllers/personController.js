/**
 * Person Controller
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 14, 2023
 * Description: Handles person-related operations
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

// Import necessary dependencies and models
const personService = require("../services/personService");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              Person Controller
 *****************************************************************************/

// Fetch all persons
getAllPersons = async (req, res) => {
  try {
    const reqParams = {
      search: req.query.search || "", // Default to an empty string if search is not provided
      limit: parseInt(req.query.limit) || 10, // Default to 10 if limit is not provided, and parse it as an integer
      offset: parseInt(req.query.offset) || 0, // Default to 0 if offset is not provided, and parse it as an integer
    };
    const personResults = await personService.getAllPersons(reqParams);
    res.send(personResults);
  } catch (error) {
    res
      .status(error.code || 500)
      .send({ status: "FAILED", data: error.message || error });
  }
};

// Controller function to handle GET request to retrieve chat by chatId

getPersonDetailByWAId = async (req, res) => {
  try {
    const WAId = req.params.waId;    
    const personData = await personService.getPersonDetail(WAId);
    res.send(personData);
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ status: "FAILED", data: error.message || error });
  }
};
// Export the Person Controller
module.exports = {
  getAllPersons,
  getPersonDetailByWAId,
};
