/**
 * Tag Service
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 10, 2023
 * Description: Provides service functions for managing tag-related operations, such as tag creation, retrieval, and update.
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

// Import the tagModel module
const tagModel = require("../models/tagModel");
const currentUserObj = require("../utils/currentUserUtils");

// Functions to get user tag results based on filter parameters
getAllTagResults = (reqParams = {}) => {
  return new Promise((resolve, reject) => {
    try {
      const currentUserData = currentUserObj.getCurrentUser();
      let filterParams = {
        merchant_id: currentUserData.merchant_id || null,
        user_id: currentUserData.id || null,
      };
      tagModel
        .findAllTags(filterParams)
        .then((alltags) => {
          const transformedTags = {
            count: alltags.length,
            next: null,
            previous: null,
            results: alltags.map((tag) => ({
              id: tag.tag_id,
              name: tag.tag_name,
              web_inbox_color: tag.web_inbox_color,
            })),
          };

          resolve(transformedTags); // Resolve the promise with all tag results
        })
        .catch((error) => {
          reject(error); //Reject the promise with the error if there was an error retrieving the tag results
        });
    } catch (error) {
      reject(error); //Reject the promise with the error if there was an error executing the function
    }
  });
};

// Export the functions as an object
module.exports = {
  getAllTagResults,
};
