/**
 * Tag Controller
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 10, 2023
 * Description: Handles tag-related operations.
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
const tagService = require("../services/tagService");
const commonHelper = require("../helpers/commonHelper");
const HttpException = require("../utils/HttpExceptionUtils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              Tag Controller
 *****************************************************************************/
// get all tags
getAllTags = async (req, res) => {
  try {
    let reqParams = {};
    const tags = await tagService.getAllTagResults(reqParams);
    if (tags.count === 0) {
      throw new HttpException(404, "Tags not found");
    }
    res.send(tags);
  } catch (error) {
    res.status(error.status || 500).send({
      status: "FAILED",
      data: { error: error.message || error },
    });
  }
};

// get Tag details by id
getTagById = (req, res) => {};

//create tag
createTag = (req, res) => {};

//update tag
updateTag = (req, res) => {};

//delete tag
deleteTag = (req, res) => {};

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = {
  getAllTags,
};
