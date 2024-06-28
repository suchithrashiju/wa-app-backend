/**
 * Webhook Controller
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 10, 2023
 * Description: Handles webhook-related operations.
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
const webhookService = require("../services/webhookService");
const commonHelper = require("../helpers/commonHelper");
const HttpException = require("../utils/HttpExceptionUtils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              Webhook Controller
 *****************************************************************************/
// get all webhooks
handleWebhook = async (req, res) => {
  try {
    const webhookData = req.body;
    // console.log("Receive webhookData");
    // console.log(webhookData);
    // Check if the webhook data is not empty
    if (!webhookData || !webhookData.entry || webhookData.entry.length === 0) {
      return res.status(400).json({ message: "Webhook data is empty" });
    }
    // Pass the webhook data to the service for processing
    await webhookService.processWebhookEvent(webhookData);

    return res
      .status(200)
      .json({ message: "Webhook data processed successfully" });
  } catch (error) {
    console.error("Error handling webhook:", error);

    res.status(error.status || 500).send({
      status: "FAILED",
      data: { error: error.message || error },
    });
  }
};

// verify token - Webhook creation
verifyWebhook = (req, res) => {
  /**
   * UPDATE YOUR VERIFY TOKEN
   *This will be the Verify Token value when you set up webhook
   **/
  const verify_token = process.env.VERIFY_TOKEN;
  // Parse params from the webhook verification request
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];
  // Check if a token and mode were sent

  if (mode && token) {
    // Check the mode and token sent are correct
    if (mode === "subscribe" && token === verify_token) {
      // Respond with 200 OK and challenge token from the request
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      console.error("Error verifying webhook:", error.message);

      res.sendStatus(403);
    }
  }
};

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = {
  handleWebhook,
  verifyWebhook,
};
