/**
 * Chat Tagging Event Controller
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 18, 2023
 * Description: Handles chat Tagging Event-related operations
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
const chatTaggingEventService = require("../services/chatTaggingEventService");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              ChatTaggingEvent Controller
 *****************************************************************************/

// get all Chat Tagging Events
getAllChatTaggingEvents = async (req, res) => {
  try {
    let reqParams = {
      limit: req.query.limit || null,
      search: req.query.search || null,
      pages: req.query.pages || null,
      original_url: req.originalUrl || null,
    };
    const chatTaggingEvents =
      await chatTaggingEventService.getAllChatTaggingEventResults(reqParams);

    res.send(chatTaggingEvents);
  } catch (error) {
    res.status(error.status || 500).send({
      status: "FAILED",
      data: error.chatTaggingEvent || error,
    });
  }
};

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = {
  getAllChatTaggingEvents,
};
