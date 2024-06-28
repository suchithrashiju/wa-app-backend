/**
 * Chat Service
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 11, 2023
 * Description: Provides service functions for managing chat-related operations, such as chat creation, retrieval and update.
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

// import chat model
const chatModel = require("../models/chatModel");
const currentUserObj = require("../utils/currentUserUtils");
const messageModel = require("../models/messageModel");
const { checkAndAddCountryCode } = require("../utils/commonUtils");
const webhookService = require("../services/webhookService");

// Functions to get user chat results based on filter param
getAllChatResults = (req = {}) => {
  return new Promise((resolve, reject) => {
    try {
      // const currentUserData = currentUserObj.getCurrentUser();

      let reqParams = {
        limit: req.query.limit || null,
        /* assigned_to_me: req.query.assigned_to_me || null,
        assigned_group: req.query.assigned_group || null,
        search: req.query.search || null,
        pages: req.query.pages || null,
        original_url: req.originalUrl || null,*/
      };

      messageModel
        .findAllContactPersonsFromWebhookData(reqParams)
        .then(async (result) => {
          let resultarr = [];
          if (result.length > 0) {
            for (let chatWAId of result) {
              let WAId = checkAndAddCountryCode(chatWAId);
              let chatResult = await webhookService.getLastMessageDetailByWAId(
                WAId
              );
              if (chatResult.length != 0) {
                resultarr.push(chatResult);
              }
            }
          }

          const transformedResult = {
            results: resultarr,
            count: resultarr.length,
            next: null,
            previous: null,
          };
          // console.log(transformedResult);

          resolve(transformedResult);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
    return;
  });
};

getChatByChatNumber = (chatWAId) => {
  return new Promise(async (resolve, reject) => {
    try {
      // resolve(response);
    } catch (error) {
      console.log("Fetching chats from webhook table");
      reject(error);
    }
  });
};
// Export the functions as an object
module.exports = {
  getAllChatResults,
  getChatByChatNumber,
};
