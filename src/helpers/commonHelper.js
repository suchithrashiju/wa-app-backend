/**
 * Common Helper Functions
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 8, 2023
 * Description: Contains common helper functions for utility and miscellaneous tasks in the application.
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
const bcrypt = require("bcryptjs");
const HttpException = require("../utils/HttpExceptionUtils");
const { check, validationResult } =
  process.env.NODE_RUN_ENV === "online"
    ? require("express-validator/check")
    : require("express-validator");
exports.validateMediaSize = (size, type) => {
  let typeSplit = type.split("/");
  switch (typeSplit[0]) {
    case `audio`:
      if (size > 16000000) return false;
      else return true;
    case `video`:
      if (
        size > 16000000 &&
        (typeSplit[1] === "mp4" || typeSplit[1] === "3gpp")
      )
        return false;
      else return true;
    case `image`:
      if (size > 5000000 && (typeSplit[1] === "jpeg" || typeSplit[1] === "png"))
        return false;
      else if (size > 100000 && typeSplit[1] === "webp") return false;
      else return true;
    case `text`:
      if (size > 100000000) return false;
      else return true;
    case `application`:
      if (size > 100000000) return false;
      else return true;
    default:
      return true;
  }
};

exports.mediaLimits = (type) => {
  let typeSplit = type.split("/");
  switch (typeSplit[0]) {
    case "audio":
      return "16MB";
    case "video":
      return "16MB";
    case "image":
      if (typeSplit[1] === "jpeg" || typeSplit[1] === "png") return "5MB";
      else return "100KB";
    case "text":
      return "100MB";
    case "pdf":
      return "100MB";
    default:
      return "";
  }
};

exports.checkValidation = (req) => {
  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    throw new HttpException(400, "Validation failed", errors);
  }
};

// hash password if it exists
exports.hashPassword = async (req) => {
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 8);
  }
};

exports.hashPasswordNew = async (reqParams) => {
  if (reqParams.password) {
    reqParams.password = await bcrypt.hash(reqParams.password, 8);
  }
};
