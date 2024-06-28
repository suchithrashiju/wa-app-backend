/**
 * Saved Response Controller
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 11, 2023
 * Description: Handles saved response-related operations
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
const savedResponseService = require("../services/savedResponseService");
const commonHelper = require("../helpers/commonHelper");
const HttpException = require("../utils/HttpExceptionUtils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              Saved Response Controller
 *****************************************************************************/

// get all savedResponses
getAllSavedResponses = async (req, res) => {
  try {
    let reqParams = {
      // limit: req.query.limit || null,
      // search: req.query.search || null,
      // pages: req.query.pages || null,
      // original_url: req.originalUrl || null,
    };
    const savedResponses =
      await savedResponseService.getAllSavedResponseResults(reqParams);
    // if (savedResponses.count == 0) {
    //   throw new HttpException(404, "SavedResponses not found");
    // }
    res.send(savedResponses);
  } catch (error) {
    res.status(error.status || 500).send({
      status: "FAILED",
      data: error.message || error,
    });
  }
};

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = {
  getAllSavedResponses,
};
