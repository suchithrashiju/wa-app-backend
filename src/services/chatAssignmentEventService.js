/**
 * Chat Assignment Event Service
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 18, 2023
 * Description: Provides service functions for managing chat-assignment-event-related operations, such as chatAssignmentEvent creation, retrieval and update.
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

// import chatAssignmentEvent model
// const chatAssignmentEventModel = require("../models/chatAssignmentEventModel");
const currentUserObj = require("../utils/currentUserUtils");

// Functions to get user chatAssignmentEvent results based on filter param
getAllChatAssignmentEventResults = (reqParams = {}) => {
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
      /* chatAssignmentEventModel
        .findAllChatAssignmentEvents(filterParams)
        .then((allChatAssignmentEvents) => {
          const results = [];
          for (const data of allChatAssignmentEvents) {
            const transformedResult = {
              chatAssignmentEvent_id: data.chatAssignmentEvent_id,
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
              chatAssignmentEvent_provider_type: data.chatAssignmentEvent_provider.type,
              chatAssignmentEvent_provider_name: data.chatAssignmentEvent_provider_name,
              chatAssignmentEvent_provider_id: data.chatAssignmentEvent_provider_id,
              last_chatAssignmentEvent_timestamp: data.last_chatAssignmentEvent_timestamp,
            };

            results.push(transformedResult);
          }

          const output = {
            count: allChatAssignmentEvents.length,
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
  getAllChatAssignmentEventResults,
};
