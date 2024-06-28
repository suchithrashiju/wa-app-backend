/**
 * Message Service
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 17, 2023
 * Description: Provides service functions for managing message-related operations, such as message creation, retrieval and update.
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

// import message model
const messageModel = require("../models/messageModel");
const currentUserObj = require("../utils/currentUserUtils");
const webhookService = require("../services/webhookService");
const { checkAndAddCountryCode } = require("../utils/commonUtils");

// Functions to get user message results based on filter param
getAllMessageResults = (reqParams = {}) => {
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
      /* messageModel
        .findAllMessages(filterParams)
        .then((allMessages) => {
          const results = [];
          for (const data of allMessages) {
            const transformedResult = {
              message_id: data.message_id,
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
              message_provider_type: data.message_provider.type,
              message_provider_name: data.message_provider_name,
              message_provider_id: data.message_provider_id,
              last_message_timestamp: data.last_message_timestamp,
            };

            results.push(transformedResult);
          }

          const output = {
            count: allMessages.length,
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

saveSendMessageData = (reqParams = {}) => {
  return new Promise((resolve, reject) => {
    try {
      const currentUserData = currentUserObj.getCurrentUser();
      reqParams.merchant_id = currentUserData.merchant_id;
      reqParams.user_id = currentUserData.id;
      reqParams.contact_id = 0;
      messageModel
        .insertMessage(reqParams)
        .then((response) => {
          console.log(response);
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};

// Export the functions as an object
module.exports = {
  getAllMessageResults,
  saveSendMessageData,
};
