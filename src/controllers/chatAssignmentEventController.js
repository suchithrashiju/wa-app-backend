/**
 * Chat Assignment Event Controller
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 18, 2023
 * Description: Handles chat assignment event-related operations
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
const chatAssignmentEventService = require("../services/chatAssignmentEventService");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              ChatAssignmentEvent Controller
 *****************************************************************************/

// get all chatAssignmentEvents
getAllChatAssignmentEvents = async (req, res) => {
  try {
    let reqParams = {
      limit: req.query.limit || null,
      search: req.query.search || null,
      pages: req.query.pages || null,
      original_url: req.originalUrl || null,
    };
    const chatAssignmentEvents =
      await chatAssignmentEventService.getAllChatAssignmentEventResults(
        reqParams
      );

    res.send(chatAssignmentEvents);
  } catch (error) {
    res.status(error.status || 500).send({
      status: "FAILED",
      data: error.chatAssignmentEvent || error,
    });
  }
};

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = {
  getAllChatAssignmentEvents,
};
