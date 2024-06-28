/**
 * Template Controller
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 11, 2023
 * Description: Handles template-related operations
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
const templateService = require("../services/templateService");
const commonHelper = require("../helpers/commonHelper");
const HttpException = require("../utils/HttpExceptionUtils");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              Template Controller
 *****************************************************************************/

// get all templates
getAllTemplates = async (req, res) => {
  try {
    let reqParams = {
      limit: req.query.limit || null,
      search: req.query.search || null,
      pages: req.query.pages || null,
      original_url: req.originalUrl || null,
    };
    const templates = await templateService.getAllTemplateResults(reqParams);
    res.send(templates);
  } catch (error) {
    console.error("Error fetching templates:", error.message);
    res.status(error.status || 500).send({
      status: "FAILED",
      data: error.message || error,
    });
  }
};

refreshTemplate = async (req, res) => {
  try {
    let reqParams = {
      currently_refreshing: req.query.currently_refreshing,
    };
    const refreshTemplateData = await templateService.getRefreshTemplates(
      reqParams
    );
    res.send(refreshTemplateData);
  } catch (error) {
    console.error("Error refreshing templates:", error.message);
    res
      .status(error.status || 500)
      .send({ status: "FAILED", data: error.message || error });
  }
};

getRefreshTemplateStatus = async (req, res) => {
  try {
    let reqParams = {
      currently_refreshing: req.query.currently_refreshing,
    };
    const refreshTemplateStatusData =
      await templateService.getRefreshTemplateStatus(reqParams);
    res.send(refreshTemplateStatusData);
  } catch (error) {
    console.error("Error refresh template status:", error.message);
    res
      .status(error.status || 500)
      .send({ status: "FAILED", data: error.message || error });
  }
};
/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = {
  getAllTemplates,
  refreshTemplate,
  getRefreshTemplateStatus,
};
