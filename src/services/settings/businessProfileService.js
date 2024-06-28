/**
 * Business Profile Service
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 12, 2023
 * Description: Service for business profile logic and data operations
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
const businessProfileModel = require("../../models/settings/businessProfileModel");
const currentUserObj = require("../../utils/currentUserUtils");
const BusinessVerticalObj = require("../../utils/businessVerticalUtils");
const dbUtils = require("../../utils/dbUtils");
const graphAPIHelper = require("../../helpers/graphAPIHelper");
const businessVerticalModel = require("../../models/settings/businessVerticalModel");

//Function to get business profile data
getBusinessProfileData = () => {
  return new Promise((resolve, reject) => {
    try {
      const currentUserData = currentUserObj.getCurrentUser();
      let filterParams = {
        merchant_id: currentUserData.merchant_id || null,
        user_id: currentUserData.id || null,
      };

      let vertical_name = "";
      let description = "";
      let address = "";
      let email = "";
      let websites = [];
      let output = {
        address: address,
        email: email,
        description: description,
        vertical: vertical_name,
        websites: websites,
      };
      resolve(output);

      let inpParam = {};
      // Call the function to get business profile data
      /* graphAPIHelper
        .getAPIBusinessProfile(inpParam)
        .then(async (rowData) => {
          // Process the business profile data as needed
          let row = rowData.data;
          let vertical_name = "";
          let description = "";
          let address = "";
          let email = "";
          let websites = [];
          if (row[0].vertical != null && row[0].vertical != undefined) {
            vertical_name = row[0].vertical;
          }
          if (row[0].email != null && row[0].email != undefined) {
            email = row[0].email;
          }
          if (row[0].address != null && row[0].address != undefined) {
            address = row[0].address;
          }
          if (row[0].description != null && row[0].description != undefined) {
            description = row[0].description;
          }
          if (row[0].websites != null && row[0].websites != undefined) {
            websites = row[0].websites;
          }

          let output = {
            address: address,
            email: email,
            description: description,
            vertical: vertical_name,
            websites: websites,
          };
          resolve(output); // Resolve the promise with the constructed output object
        })
        .catch((error) => {
          // Handle any errors that occurred during the API request
          console.error("Business Profile - Error:", error.message);
        });
      */
    } catch (error) {
      reject(error);
    }
  });
};

//update business profile data
updateBusinessProfileData = (profileData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const currentUserData = currentUserObj.getCurrentUser();
      const profileId = await dbUtils.fetchField(
        "bwcrm_business_profiles",
        "profile_id",
        {
          merchant_id: currentUserData.merchant_id,
          user_id: currentUserData.id,
        }
      );

      if (
        profileData.vertical !== null &&
        profileData.vertical !== undefined &&
        profileData.vertical !== ""
      ) {
        const vertical_id = await dbUtils.fetchField(
          "bwcrm_business_verticals",
          "vertical_id",
          {
            vertical_name: profileData.vertical,
          }
        );
        profileData["business_vertical_id"] = vertical_id;
      }

      const { vertical, websites, ...updateData } = profileData;

      console.log("updateData");
      console.log(updateData);
      const endpoint = `/${process.env.PHONE_NUMBER_ID}/whatsapp_business_profile`;

      try {
        const response = await graphAPIHelper.makeGraphApiRequest(endpoint, {
          method: "POST",
          data: updateData,
        });
        const message = "Business profile data updated successfully";

        console.log("updated WhatsApp business profile");
        console.log(response);
        return response;
      } catch (error) {
        throw new Error(
          `Failed to update WhatsApp business profile: ${error.message}`
        );
      }
    } catch (error) {
      reject(error);
    }
  });
};

getAllBusinessVerticals = () => {
  return new Promise((resolve, reject) => {
    let filterParams = {};
    businessVerticalModel
      .findAllBusinessVerticals(filterParams)
      .then((allVerticals) => {
        const results = [];
        for (const data of allVerticals) {
          const transformedResult = {
            vertical_name: data.vertical_name,
            vertical: data.vertical_value,
          };

          results.push(transformedResult);
        }

        const output = {
          count: allVerticals.length,
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
  });
};

//Export the Business Profile Service
module.exports = {
  getBusinessProfileData,
  updateBusinessProfileData,
  getAllBusinessVerticals,
};
