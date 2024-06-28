/**
 * Business Profile Controller
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 12, 2023
 * Description: Controller for handling API requests related to the business profile settings
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
const businessProfileService = require("../../services/settings/businessProfileService");
const commonHelper = require("../../helpers/commonHelper");
const HttpException = require("../../utils/HttpExceptionUtils");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              Business Profile Controller
 *****************************************************************************/

// Fetch business profile detail
getBusinessProfileDetail = async (req, res) => {
  try {
    const businessProfileData =
      await businessProfileService.getBusinessProfileData();
    res.send(businessProfileData);
  } catch (error) {
    console.error("Error fetching WhatsApp Business Profile:", error.message);

    res
      .status(error.status || 500)
      .send({ status: "FAILED", data: error.message || error });
  }
};

//Update updateBusinessProfile

updateBusinessProfile = async (req, res) => {
  try {
    const { address, description, email, vertical, websites } = req.body;
    const profileData = { address, description, email, vertical, websites };

    const responseData = await businessProfileService.updateBusinessProfileData(
      profileData
    );
    res.send(responseData);
  } catch (error) {
    console.error("Error updating WhatsApp Business Profile:", error.message);

    res
      .status(error.status || 500)
      .send({ status: "FAILED", data: error.message || error });
  }
};

// Fetch business verticals
getBusinessVerticals = async (req, res) => {
  try {
    const businessProfileData =
      await businessProfileService.getAllBusinessVerticals();
    res.send(businessProfileData);
  } catch (error) {
    console.error("Error fetching WhatsApp Business Verticals:", error.message);

    res
      .status(error.status || 500)
      .send({ status: "FAILED", data: error.message || error });
  }
};

/******************************************************************************
 *                              Export Controller
 *****************************************************************************/

// Export the Business Profile Controller
module.exports = {
  getBusinessProfileDetail,
  updateBusinessProfile,
  getBusinessVerticals,
};
