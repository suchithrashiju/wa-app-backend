/**
 * Mark As Received Controller
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 18, 2023
 * Description: Handles mark as received-related operations
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
const markAsReceivedService = require("../services/markAsReceivedService");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              MarkAsReceived Controller
 *****************************************************************************/

// get all markAsReceiveds
getAllMarkAsReceivedData = async (req, res) => {
  try {
    let reqParams = {
      limit: req.query.limit || null,
      search: req.query.search || null,
      pages: req.query.pages || null,
      original_url: req.originalUrl || null,
    };
    const markAsReceiveds =
      await markAsReceivedService.getAllMarkAsReceivedResults(reqParams);
    // if (markAsReceiveds.count == 0) {
    //   throw new HttpException(404, "MarkAsReceiveds not found");
    // }
    res.send(markAsReceiveds);
  } catch (error) {
    res.status(error.status || 500).send({
      status: "FAILED",
      data: error.markAsReceived || error,
    });
  }
};

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = {
  getAllMarkAsReceivedData,
};
