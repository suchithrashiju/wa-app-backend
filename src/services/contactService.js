/**
 * Contact Service
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 11, 2023
 * Description: Provides service functions for managing contact-related operations, such as contact creation, retrieval and update.
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

// import contact model
const contactModel = require("../models/contactModel");
const currentUserObj = require("../utils/currentUserUtils");
const {
  verifyContact,
  formatPhoneNumberForWaID,
} = require("../utils/commonUtils");

// Functions to get user contact results based on filter param
getAllContactResults = (reqParams = {}) => {
  return new Promise((resolve, reject) => {
    try {
      const currentUserData = currentUserObj.getCurrentUser();
      let filterParams = {
        merchant_id: currentUserData.merchant_id || null,
        user_id: currentUserData.id || null,
      };
      contactModel
        .findAllContacts(filterParams)
        .then((allContacts) => {
          const results = [];
          for (const data of allContacts) {
            const transformedResult = {
              contact_id: data.contact_id,
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
              contact_provider_type: data.contact_provider_type,
              contact_provider_name: data.contact_provider_name,
              contact_provider_id: data.contact_provider_id,
              last_message_timestamp: data.last_message_timestamp,
            };

            results.push(transformedResult);
          }

          const output = {
            count: allContacts.length,
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
        });
    } catch (error) {
      reject(error);
    }
  });
};
getAllContactResultsByWAId = (reqParams = {}) => {
  return new Promise((resolve, reject) => {
    try {
      const currentUserData = currentUserObj.getCurrentUser();
      let filterParams = {
        merchant_id: currentUserData.merchant_id || null,
        user_id: currentUserData.id || null,
      };
      contactModel
        .findAllContacts(filterParams)
        .then((allContacts) => {
          const results = [];
          for (const data of allContacts) {
            const transformedResult = {
              contact_id: data.contact_id,
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
              contact_provider_type: data.contact_provider_type,
              contact_provider_name: data.contact_provider_name,
              contact_provider_id: data.contact_provider_id,
              last_message_timestamp: data.last_message_timestamp,
            };

            results.push(transformedResult);
          }

          const output = {
            count: allContacts.length,
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
        });
    } catch (error) {
      reject(error);
    }
  });
};

function verifyContacts(reqParams) {
  return new Promise(async (resolve, reject) => {
    const { contacts } = reqParams;
    if (!contacts || !Array.isArray(contacts) || contacts.length === 0) {
      reject(
        new Error(
          "Contacts array is required and should contain at least one contact."
        )
      );
    }
    const verifiedContacts = [];
    try {
      await Promise.all(
        contacts.map(async (contact) => {
          const isValidContact = await verifyContact(contact);
          const formattedWaID = formatPhoneNumberForWaID(contact);

          if (isValidContact) {
            verifiedContacts.push({
              wa_id: formattedWaID,
              input: contact,
              status: "valid",
            });
          } else {
            verifiedContacts.push({
              input: contact,
              status: "invalid",
            });
          }
        })
      );

      const output = {
        contacts: verifiedContacts,
      };
      resolve(output);
    } catch (error) {
      reject(error);
    }
  });
}
// Export the functions as an object
module.exports = {
  getAllContactResults,
  getAllContactResultsByWAId,
  verifyContacts,
};
