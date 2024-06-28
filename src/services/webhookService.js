/**
 * Webhook Service
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 24, 2023
 * Description: Provides service functions for managing webhook-related operations.
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

// Import the messageModel module
const messageModel = require("../models/messageModel");
const cryptoHelper = require("../helpers/cryptoHelper");
const dbUtils = require("../../src/utils/dbUtils"); // Import the dbUtils module

processWebhookEvent = (webhookData = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response_data = JSON.stringify(webhookData);
      for (const entry of webhookData.entry) {
        for (const change of entry.changes) {
          const messageData = change.value;
          var webhook_id = "";
          var on_incoming_message = "";
          var message_type = "";
          var on_outgoing_message = "";
          var wa_id = "";
          var flag = 0;
          // Check message type (assuming you want to save only "text" messages)
          if (messageData.messages && messageData.messages.length > 0) {
            webhook_id = messageData.messages[0].id;
            message_type = messageData.messages[0].type;
            on_incoming_message = JSON.stringify(messageData);
            wa_id = messageData.messages[0].from;
            flag = 1; //incoming - recievd
          }

          if (messageData.statuses && messageData.statuses.length > 0) {
            //Sent messages
            webhook_id = messageData.statuses[0].id;
            on_outgoing_message = JSON.stringify(messageData);
            wa_id = messageData.statuses[0].recipient_id;
            flag = 2; //outgoing - sent msg
            message_type = "template";
          }
          if (webhook_id != "") {
            let filterParams = {
              webhook_id: webhook_id,
            };

            let webhook_msg_data = await messageModel.findWebhookMessageByWAId(
              filterParams
            );
            let webhook_msg_id_exists = 0;
            if (webhook_msg_data && webhook_msg_data.length) {
              webhook_msg_id_exists = webhook_msg_data[0].message_id;
            }

            if (webhook_msg_id_exists > 0) {
              console.log(
                "Already inserted message row to updated corresponding webhook data"
              );
              if (webhook_msg_data[0].webhook_status == 0) {
                let updateData = {
                  on_incoming_message: on_incoming_message,
                  on_outgoing_message: on_outgoing_message,
                  response_data: response_data,
                  updated_at: new Date(), // Current timestamp
                  webhook_status: 1,
                };
                messageModel
                  .updateWebhookData(webhook_msg_id_exists, updateData)
                  .then((response) => {
                    resolve(response);
                  })
                  .catch((error) => {
                    reject(error);
                  });
                console.log("updated webhook data");
              }
            } else {
              let insertData = {
                webhook_id: webhook_id,
                flag: flag,
                on_incoming_message: on_incoming_message,
                message_type: message_type,
                on_outgoing_message: on_outgoing_message,
                wa_id: wa_id,
                response_data: response_data,
                created_at: new Date(), // Current timestamp
                webhook_status: 1,
              };
              messageModel
                .insertWebhookData(insertData)
                .then((response) => {
                  resolve(response);
                })
                .catch((error) => {
                  reject(error);
                });
              console.log(" inserted  webhook data");
            }
          } else {
            reject("Invalid webhook data");
          }
        }
      }
    } catch (error) {
      reject(error); //Reject the promise with the error if there was an error executing the function
    }
  });
};

getAllWebhookResultsByWAId = (req) => {
  return new Promise((resolve, reject) => {
    try {
      let WAId = req.query.wa_id;
      // limit: req.query.limit || null,
      // offset: req.query.offset || null,
      let filterParams = {
        wa_id: WAId,
      };
      const resultarr = [];
      messageModel
        .findAllwebhookdata(filterParams)
        .then(async (result) => {
          if (result.length > 0) {
            for (let wbRows of result) {
              let last_message_timestamp = "";
              let message_detail = {};
              let read_time = "";
              let originalJson = "";
              let contact_arr = {};
              let waba_statuses = {};
              let sender_det = null;
              let from_us = false;
              let received = false;
              if (wbRows.flag == 1) {
                from_us = false;
                received = true;
                originalJson = JSON.parse(wbRows.on_incoming_message);
                last_message_timestamp = originalJson.messages[0].timestamp;
                // message_detail = originalJson.messages;
                if (
                  Array.isArray(originalJson.messages) &&
                  originalJson.messages.length > 0
                ) {
                  message_detail = originalJson.messages[0];
                }

                let contact_det = "";
                if (
                  Array.isArray(originalJson.contacts) &&
                  originalJson.contacts.length > 0
                ) {
                  contact_det = originalJson.contacts[0];
                }
                let profile_name = contact_det.profile.name;
                let firstLetter = profile_name.charAt(0).toUpperCase();
                contact_arr = {
                  wa_id: WAId,
                  waba_payload: contact_det,
                  initials: firstLetter,
                  last_message_timestamp: last_message_timestamp,
                };
                waba_statuses = {
                  sent: null,
                  delivered: null,
                  read: read_time,
                };
              } else {
                if (wbRows.on_outgoing_message) {
                  originalJson = JSON.parse(wbRows.on_outgoing_message);
                  last_message_timestamp = originalJson.statuses[0].timestamp;
                  read_time = last_message_timestamp;
                }
                let contact_det = "";
                let profile_name = "";
                let firstLetter = "";
                let lastIncomingmsgdet = "";
                if (wbRows.webhook_status == 1) {
                  lastIncomingmsgdet = await dbUtils.fetchField(
                    "bwcrm_messages",
                    "on_incoming_message",
                    {
                      wa_id: WAId,
                      flag: 1,
                    },
                    " ORDER BY message_id DESC "
                  );
                }
                if (lastIncomingmsgdet != "") {
                  lastIncomingmsgdetJson = JSON.parse(lastIncomingmsgdet);
                  if (
                    Array.isArray(lastIncomingmsgdetJson.contacts) &&
                    lastIncomingmsgdetJson.contacts.length > 0
                  ) {
                    contact_det = lastIncomingmsgdetJson.contacts[0];
                    profile_name = contact_det.profile.name;
                    firstLetter = profile_name.charAt(0).toUpperCase();
                  }
                } else {
                  profile_name = WAId;
                  firstLetter = profile_name.charAt(0);
                  contact_det = {
                    profile: {
                      name: profile_name,
                    },
                    wa_id: WAId,
                  };
                }

                contact_arr = {
                  wa_id: WAId,
                  waba_payload: contact_det,
                  initials: firstLetter,
                  last_message_timestamp: last_message_timestamp,
                };
                if (wbRows.message_input) {
                  let message_input_originalJson = JSON.parse(
                    wbRows.message_input
                  );

                  let ymdDate = new Date(wbRows.created_at);
                  let timestamp = Math.floor(ymdDate.getTime() / 1000); // Convert to seconds
                  if (message_input_originalJson.type === "text") {
                    message_detail = {
                      type: message_input_originalJson.type,
                      text: message_input_originalJson.text,
                      timestamp: timestamp,
                      to: WAId,
                    };
                  } else {
                    message_detail = {
                      type: message_input_originalJson.type,
                      template: message_input_originalJson.template,
                      timestamp: timestamp,
                      to: WAId,
                    };
                  }
                }

                waba_statuses = {
                  sent: null,
                  delivered: null,
                  read: read_time,
                };
                sender_det = {
                  url: "https://3b99e38208f6.inbox.platform.get.chat/api/v1/users/1/",
                  id: 1,
                  username: "info@gingertechnologies.in",
                  first_name: "",
                  last_name: "",
                  email: "",
                  profile: {
                    role: "admin",
                  },
                  groups: [
                    {
                      id: 2,
                      name: "Admin",
                    },
                  ],
                  permissions: {
                    can_use_tags: true,
                    can_read_chats: "all",
                    can_write_to_chats: "all",
                  },
                };
                from_us = true;
                received = false;
              }
              // Use the toLocaleString method to get a formatted date and time string
              // const date = new Date(last_message_timestamp * 1000);
              // const formattedDateTime = date.toLocaleString();
              let encryptedId = cryptoHelper.encryptData(wbRows.message_id);
              const chatRow = {
                id: encryptedId,
                contact: contact_arr,
                waba_payload: message_detail,
                waba_statuses: waba_statuses,
                from_us: from_us,
                received: received,
                sender: sender_det,
                context: null,
                customer_wa_id: WAId,
                tags: [],
                chat_tags: [],
                wa_id: WAId,
              };

              /* 
//msg sent saamp

let chatRow ={
            "id": "f9dd2990-bee5-44b7-bc90-201a0b4d3a47",
            "waba_payload": {
                "from": "918848499282",
                "id": "ABEGkYhISZKCAhCOKQjdeAoldc7wm4GI79Hd",
                "text": {
                    "body": "This is test msg"
                },
                "timestamp": 1696583080,
                "type": "text"
            },
            "waba_statuses": {
                "sent": null,
                "delivered": null,
                "read": 1696583082.7982216
            },
            "contact": {
                "wa_id": "918848499282",
                "waba_payload": {
                    "profile": {
                        "name": "Suchithrashiju"
                    },
                    "wa_id": "918848499282"
                },
                "initials": "S",
                "last_message_timestamp": 1696583080.0
            },
            "from_us": false,
            "received": true,
            "sender": null,
            "context": null,
            "customer_wa_id": "918848499282",
            "tags": [],
            "chat_tags": []
        };

//template sampl
              let chatRow = {
                id: "b4da75b2-aa49-46da-9fc0-eb5453fa5b47",
                waba_payload: {
                  type: "template",
                  verify_contact: false,
                  template: {
                    namespace: "da6871ed_8234_4ab7_bd84_8483f27b4392",
                    name: "welocme",
                    language: {
                      code: "en",
                      policy: "deterministic",
                    },
                    components: [],
                  },
                  wa_id: "918848499282",
                  timestamp: 1696997645,
                  to: "918848499282",
                  id: "gBEGkYhISZKCAgl1GmhZTFwTs9I",
                },
                waba_statuses: {
                  sent: 1696997646.0,
                  delivered: 1696997647.0,
                  read: 1696999433.0,
                },
                contact: {
                  wa_id: "918848499282",
                  waba_payload: {
                    profile: {
                      name: "Suchithrashiju",
                    },
                    wa_id: "918848499282",
                  },
                  initials: "S",
                  last_message_timestamp: 1696583080.0,
                },
                from_us: true,
                received: true,
                sender: {
                  url: "https://3b99e38208f6.inbox.platform.get.chat/api/v1/users/1/",
                  id: 1,
                  username: "info@gingertechnologies.in",
                  first_name: "",
                  last_name: "",
                  email: "",
                  profile: {
                    role: "admin",
                  },
                  groups: [
                    {
                      id: 2,
                      name: "Admin",
                    },
                  ],
                  permissions: {
                    can_use_tags: true,
                    can_read_chats: "all",
                    can_write_to_chats: "all",
                  },
                },
                context: null,
                customer_wa_id: "918848499282",
                tags: [],
                chat_tags: [],
              };
              */
              resultarr.push(chatRow);
            }
          }

          let transformedResult = {
            results: resultarr,
            count: resultarr.length,
            next: null,
            previous: null,
          };
          resolve(transformedResult);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};

getLastMessageDetailByWAId = (WAId) => {
  return new Promise((resolve, reject) => {
    try {
      let filterParams = {
        wa_id: WAId,
      };

      messageModel
        .getLastMessageByWAId(filterParams)
        .then(async (result) => {
          if (result) {
            let last_message_timestamp = "";
            let message_detail = "";
            let read_time = "";
            let originalJson = "";
            let message_input_originalJson = "";
            let contact_arr = {};
            let waba_statuses = {};
            if (result.flag == 1) {
              originalJson = JSON.parse(result.on_incoming_message);
              last_message_timestamp = originalJson.messages[0].timestamp;
              message_detail = originalJson.messages;
              if (
                Array.isArray(originalJson.messages) &&
                originalJson.messages.length > 0
              ) {
                message_detail = originalJson.messages[0];
              }
              let contact_det = "";
              let profile_name = "";
              let firstLetter = "";
              if (
                Array.isArray(originalJson.contacts) &&
                originalJson.contacts.length > 0
              ) {
                contact_det = originalJson.contacts[0];
                profile_name = contact_det.profile.name;
                firstLetter = profile_name.charAt(0).toUpperCase();
              }

              contact_arr = {
                wa_id: WAId,
                waba_payload: contact_det,
                initials: firstLetter,
                last_message_timestamp: last_message_timestamp,
              };
              waba_statuses = {
                sent: null,
                delivered: null,
                read: read_time,
              };
            } else {
              if (result.on_outgoing_message) {
                originalJson = JSON.parse(result.on_outgoing_message);
                last_message_timestamp = originalJson.statuses[0].timestamp;
                read_time = last_message_timestamp;
              }
              let contact_det = "";
              let profile_name = "";
              let firstLetter = "";
              let lastIncomingmsgdet = "";
              if (result.webhook_status == 1) {
                lastIncomingmsgdet = await dbUtils.fetchField(
                  "bwcrm_messages",
                  "on_incoming_message",
                  {
                    wa_id: WAId,
                    flag: 1,
                  },
                  " ORDER BY message_id DESC "
                );
              }

              if (lastIncomingmsgdet != "") {
                lastIncomingmsgdetJson = JSON.parse(lastIncomingmsgdet);
                if (
                  Array.isArray(lastIncomingmsgdetJson.contacts) &&
                  lastIncomingmsgdetJson.contacts.length > 0
                ) {
                  contact_det = lastIncomingmsgdetJson.contacts[0];
                  profile_name = contact_det.profile.name;
                  firstLetter = profile_name.charAt(0).toUpperCase();
                }
              } else {
                profile_name = WAId;
                firstLetter = profile_name.charAt(0);
                contact_det = {
                  profile: {
                    name: profile_name,
                  },
                  wa_id: WAId,
                };
              }

              contact_arr = {
                wa_id: WAId,
                waba_payload: contact_det,
                initials: firstLetter,
                last_message_timestamp: last_message_timestamp,
              };
              message_input_originalJson = JSON.parse(result.message_input);
              message_detail = message_input_originalJson;
              waba_statuses = {
                sent: null,
                delivered: null,
                read: read_time,
              };
            }
            let new_messages = last_message_timestamp;
            // Use the toLocaleString method to get a formatted date and time string
            // const date = new Date(last_message_timestamp * 1000);
            // const formattedDateTime = date.toLocaleString();

            let encryptedId = cryptoHelper.encryptData(result.message_id);

            let resultarr = {
              contact: contact_arr,
              last_message: {
                id: encryptedId,
                waba_payload: message_detail,
                waba_statuses: waba_statuses,
                contact: contact_arr,
                from_us: false,
                received: false,
                sender: null,
                context: null,
                customer_wa_id: WAId,
                tags: [],
                chat_tags: [],
              },
              new_messages: new_messages,
              wa_id: WAId,
              assigned_to_user: [],
              assigned_group: "",
              tags: [],
            };
            resolve(resultarr);
          } else {
            let resultarr = [];
            resolve(resultarr);
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

// Export the functions as an object
module.exports = {
  processWebhookEvent,
  getAllWebhookResultsByWAId,
  getLastMessageDetailByWAId,
};
