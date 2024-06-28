/**
 * Chat Tagging Event Service
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 18, 2023
 * Description: Provides service functions for managing chat-tagging-event-related operations, such as chatTaggingEvent creation, retrieval and update.
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

// import chatTaggingEvent model
// const chatTaggingEventModel = require("../models/chatTaggingEventModel");
const currentUserObj = require("../utils/currentUserUtils");

// Functions to get user chatTaggingEvent results based on filter param
getAllChatTaggingEventResults = (reqParams = {}) => {
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
      /* chatTaggingEventModel
        .findAllChatTaggingEvents(filterParams)
        .then((allChatTaggingEvents) => {
          const results = [];
          for (const data of allChatTaggingEvents) {
            const transformedResult = {
              chatTaggingEvent_id: data.chatTaggingEvent_id,
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
              chatTaggingEvent_provider_type: data.chatTaggingEvent_provider.type,
              chatTaggingEvent_provider_name: data.chatTaggingEvent_provider_name,
              chatTaggingEvent_provider_id: data.chatTaggingEvent_provider_id,
              last_chatTaggingEvent_timestamp: data.last_chatTaggingEvent_timestamp,
            };

            results.push(transformedResult);
          }

          const output = {
            count: allChatTaggingEvents.length,
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
  getAllChatTaggingEventResults,
};
