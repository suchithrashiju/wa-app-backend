/**
 * Saved Response Service
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 11, 2023
 * Description: Provides service functions for managing saved response-related operations, such as saved response creation, retrieval and update.
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

// import savedResponse model
const savedResponseModel = require("../models/savedResponseModel");
const currentUserObj = require("../utils/currentUserUtils");

// Functions to get user savedResponse results based on filter param
getAllSavedResponseResults = (reqParams = {}) => {
  return new Promise((resolve, reject) => {
    try {
      const currentUserData = currentUserObj.getCurrentUser();

      let filterParams = {
        merchant_id: currentUserData.merchant_id || null,
        user_id: currentUserData.id || null,
      };
      savedResponseModel
        .findAllSavedResponses(filterParams)
        .then((allSavedResponses) => {
          const output = {
            count: allSavedResponses.length,
            next: null,
            previous: null,
            results: allSavedResponses,
          };

          resolve(output); // Resolve the promise with the constructed output object
        })
        .catch((error) => {
          {
            reject(error);
          }
        });
    } catch (error) {
      reject(error);
    }
    return;
  });
};

// Export the functions as an object
module.exports = {
  getAllSavedResponseResults,
};
