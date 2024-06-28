/**
 * Media Service
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 17, 2023
 * Description: Provides service functions for managing media-related operations, such as media creation, retrieval and update.
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

// import media model
const mediaModel = require("../models/mediaModel");
const currentUserObj = require("../utils/currentUserUtils");

// Functions to get user media results based on filter param
getAllMediaResults = (reqParams = {}) => {
  return new Promise((resolve, reject) => {
    try {
      const currentUserData = currentUserObj.getCurrentUser();

      let filterParams = {
        merchant_id: currentUserData.merchant_id || null,
        user_id: currentUserData.id || null,
      };
      const results = [];

      const output = {
        count: 0,
        next: null,
        previous: null,
        results,
      };
      console.log(output);
      resolve(output); // Resolve the promise with the constructed output object
    } catch (error) {
      reject(error);
    }
  });
};

// Export the functions as an object
module.exports = {
  getAllMediaResults,
};
