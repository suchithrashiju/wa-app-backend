/**
 * Person Service
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 14, 2023
 * Description: Service for managing person data and related operations.
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

// import person model
const personModel = require("../models/personModel");
const currentUserObj = require("../utils/currentUserUtils");
const messageModel = require("../models/messageModel");
const dbUtils = require("../../src/utils/dbUtils"); // Import the dbUtils module

// Get all persons
getAllPersons = (reqParams = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const currentUserData = currentUserObj.getCurrentUser();

      let filterParams = {
        merchant_id: currentUserData.merchant_id || null,
        user_id: currentUserData.id || null,
        search: reqParams.search || null,
        limit: reqParams.limit || null,
        offset: reqParams.offset || null,
      };
      personModel
        .findAllPersons(filterParams)
        .then((allPersons) => {
          const results = [];
          if (allPersons.length) {
            for (const data of allPersons) {
              // Assuming you have retrieved the last_message_timestamp from the database as a Date object
              const lastMessageDate = new Date(data.last_message_timestamp);

              // Convert the Date object to an integer representing the Unix timestamp
              const lastMessageTimestampInt = Math.floor(
                lastMessageDate.getTime() / 1000
              );

              const transformedResult = {
                wa_id: data.wa_id,
                waba_payload: data.waba_payload,
                initials: data.person_initials,
                last_message_timestamp: lastMessageTimestampInt,
              };

              results.push(transformedResult);
            }
          }

          const output = {
            count: allPersons.length,
            next: null,
            previous: null,
            results,
          };

          resolve(output);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};

getPersonDetail = (waId) => {
  return new Promise(async (resolve, reject) => {
    try {
      filterParams = {
        wa_id: waId,
        flag: 1,
      };

      messageModel
        .getLastMessageByWAId(filterParams)
        .then(async (result) => {
          if (result) {
            originalJson = JSON.parse(result.on_incoming_message);
            last_message_timestamp = originalJson.messages[0].timestamp;

            let contact_det = "";
            if (
              Array.isArray(originalJson.contacts) &&
              originalJson.contacts.length > 0
            ) {
              contact_det = originalJson.contacts[0];
            }
            let profile_name = contact_det.profile.name;
            let firstLetter = profile_name.charAt(0).toUpperCase();
            let transformedResult = {
              wa_id: waId,
              waba_payload: contact_det,
              initials: firstLetter,
              last_message_timestamp: last_message_timestamp,
            };

            resolve(transformedResult);
          } else {
            created_at = await dbUtils.fetchField(
              "bwcrm_messages",
              "created_at",
              {
                wa_id: waId,
              },
              " ORDER BY message_id DESC "
            );

            let ymdDate = new Date(created_at);
            let timestamp = Math.floor(ymdDate.getTime() / 1000); // Convert to seconds
            let profile_name = waId;
            let firstLetter = profile_name.charAt(0);
            let transformedResult = {
              wa_id: waId,
              waba_payload: {
                profile: { name: profile_name },
                wa_id: waId,
              },
              initials: firstLetter,
              last_message_timestamp: timestamp,
            };
            resolve(transformedResult);
          }
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};

// Export the person service functions
module.exports = {
  getAllPersons,
  getPersonDetail,
};
