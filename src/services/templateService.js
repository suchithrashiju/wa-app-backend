/**
 * Template Service
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 11, 2023
 * Description: Provides service functions for managing template-related operations, such as template creation, retrieval and update.
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

// import template model
const templateModel = require("../models/templateModel");
const currentUserObj = require("../utils/currentUserUtils");
const messageHelper = require("../helpers/messageHelper");

checkAccessToken = () => {
  // Call the function to get the access token
  messageHelper
    .getAccessToken()
    .then((accessToken) => {
      console.log("Access Token:", accessToken);
      // Now you can use this accessToken to make the API request to fetch message templates.
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
};

// Function to get user template results based on filter param
getAllTemplateResults = (reqParams = {}) => {
  return new Promise((resolve, reject) => {
    try {
      const currentUserData = currentUserObj.getCurrentUser();

      let filterParams = {
        merchant_id: currentUserData.merchant_id || null,
        user_id: currentUserData.id || null,
      };
      const results = [];

      // Call the function to get message templates
      messageHelper
        .getMessageTemplates()
        .then((messageTemplates) => {
          // Process the messageTemplates as needed
          const results = messageTemplates.data.map(({ id, ...rest }) => ({
            ...rest,
            status: rest.status.toLowerCase(), // Convert status to lowercase
            components: rest.components.map((component) => ({ ...component })),
          }));
          const output = {
            count: results.length,
            next: null,
            previous: null,
            results,
          };

          resolve(output); // Resolve the promise with the constructed output object
        })
        .catch((error) => {
          // Handle any errors that occurred during the API request
          console.error("Error:", error.message);
        });
    } catch (error) {
      reject(error);
    }
    return;
  });
};

getRefreshTemplates = (reqParams = {}) => {
  return new Promise((resolve, reject) => {
    try {
      const currentUserData = currentUserObj.getCurrentUser();

      let filterParams = {
        merchant_id: currentUserData.merchant_id || null,
        user_id: currentUserData.id || null,
      };
      const results = [];

      // Call the function to get message templates
      /* messageHelper
        .getMessageTemplates()
        .then((messageTemplates) => {
          // Process the messageTemplates as needed
          const results = messageTemplates.data.map(({ id, ...rest }) => ({
            ...rest,
            status: rest.status.toLowerCase(), // Convert status to lowercase
            components: rest.components.map((component) => ({ ...component })),
          }));*/
      const output = {
        count: results.length,
        next: null,
        previous: null,
        results,
      };

      resolve(output); // Resolve the promise with the constructed output object
      /* })
        .catch((error) => {
          // Handle any errors that occurred during the API request
          console.error("Error:", error.message);
        });*/
    } catch (error) {
      reject(error);
    }
    return;
  });
};

getRefreshTemplateStatus = (reqParams = {}) => {
  return new Promise((resolve, reject) => {
    try {
      const currentUserData = currentUserObj.getCurrentUser();

      let filterParams = {
        merchant_id: currentUserData.merchant_id || null,
        user_id: currentUserData.id || null,
      };
      // Call the function to get message templates
      /*  messageHelper
        .getMessageTemplates()
        .then((messageTemplates) => {
          // Process the messageTemplates as needed
          const results = messageTemplates.data.map(({ id, ...rest }) => ({
            ...rest,
            status: rest.status.toLowerCase(), // Convert status to lowercase
            components: rest.components.map((component) => ({ ...component })),
          }));*/
      const output = {
        currently_refreshing: false,
        count: results.length,
        next: null,
        previous: null,
        results,
      };

      resolve(output); // Resolve the promise with the constructed output object
      /*  })
        .catch((error) => {
          // Handle any errors that occurred during the API request
          console.error("Error:", error.message);
        });*/
    } catch (error) {
      reject(error);
    }
    return;
  });
};
// Export the functions as an object
module.exports = {
  getAllTemplateResults,
  getRefreshTemplates,
  getRefreshTemplateStatus,
};
