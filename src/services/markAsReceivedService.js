/**
 * Mark As Received Service
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 18, 2023
 * Description: Provides service functions for managing mark as received-related operations.
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

// import markAsReceived model
const markAsReceivedModel = require("../models/markAsReceivedModel");
const currentUserObj = require("../utils/currentUserUtils");

// Functions to get user markAsReceived results based on filter param
getAllMarkAsReceivedResults = (reqParams = {}) => {
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
      /* markAsReceivedModel
        .findAllMarkAsReceiveds(filterParams)
        .then((allMarkAsReceiveds) => {
          const results = [];
          for (const data of allMarkAsReceiveds) {
            const transformedResult = {
              markAsReceived_id: data.markAsReceived_id,
              name: data.name,
              initials: data.initials,
              avatar: data.avatar,
              large_avatar: data.largeAvatar,
              phone_numbers: [
                {
                  phone_number: data.phone_number,
                  description: data.phone_description,
                },
              ],
              email_address: data.email_address,
              email_description: data.email_description,
              url: data.url,
              url_description: data.url_description,
              markAsReceived_provider_type: data.markAsReceived_provider.type,
              markAsReceived_provider_name: data.markAsReceived_provider_name,
              markAsReceived_provider_id: data.markAsReceived_provider_id,
              last_markAsReceived_timestamp: data.last_markAsReceived_timestamp,
            };

            results.push(transformedResult);
          }

          const output = {
            count: allMarkAsReceiveds.length,
            next: null,
            previous: null,
            results,
          };

          resolve(output); // Resolve the promise with the constructed output object
          
        })
        .catch((error) => {
          {
            reject(error);
          }
        });*/
    } catch (error) {
      reject(error);
    }
  });
};

// Export the functions as an object
module.exports = {
  getAllMarkAsReceivedResults,
};
