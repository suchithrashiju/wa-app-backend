/**
 * Message Controller
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 11, 2023
 * Description: Handles message-related operations
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
const messageService = require("../services/messageService");
const dotenv = require("dotenv");
dotenv.config();

const messageHelper = require("../helpers/messageHelper");
const webhookService = require("../services/webhookService");
const { checkAndAddCountryCode } = require("../utils/commonUtils");

/******************************************************************************
 *                              Message Controller
 *****************************************************************************/
sendChatMessage = async (req, res) => {
  let reqSendMsgParams = req.body;
  console.log("reqSendMsgParams 001");
  console.log(reqSendMsgParams);
  // return false;
  let wa_id = checkAndAddCountryCode(req.body.wa_id);
  if (reqSendMsgParams.type === "text") {
    var data = messageHelper.getTextMessageInput(wa_id, reqSendMsgParams.text);
  } else if (reqSendMsgParams.type === "template") {
    var data = messageHelper.getTemplatedMessageInputWithoutBodyParam(
      wa_id,
      reqSendMsgParams
    );
  } else {
    var data = messageHelper.getMessageInputData(wa_id, reqSendMsgParams);
  }
  console.log("sending data");
  console.log(data);
  try {
    const response = await messageHelper.sendMessage(data);
    // Handle the success response
    const respSentMessage = response.data;
    let webhook_id = respSentMessage.messages[0].id; // Access the 'id' property
    const inpParams = {
      message_type: req.body.type,
      wa_id: wa_id,
      message_input: JSON.stringify(req.body),
      message_output: JSON.stringify(respSentMessage),
      webhook_id: webhook_id,
      flag: 2,
      response_data: "",
    };
    const responsemsg = await messageService.saveSendMessageData(inpParams);
    res.send(responsemsg);
  } catch (error) {
    // Handle the error
    res
      .status(error.status || 500)
      .send({ status: "FAILED", data: error.message || error });
  }
};

// get all messages
getAllMessages = async (req, res) => {
  try {
    // { wa_id: '', offset: '0', limit: '30' }
    const messages = await webhookService.getAllWebhookResultsByWAId(req);
    res.send(messages);
  } catch (error) {
    res.status(error.status || 500).send({
      status: "FAILED",
      data: error.message || error,
    });
  }
};

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = {
  getAllMessages,
  sendChatMessage,
};
