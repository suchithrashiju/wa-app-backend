/**
 * Profile Service
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
const profileModel = require("../../models/settings/profileModel");
const currentUserObj = require("../../utils/currentUserUtils");
const BusinessVerticalObj = require("../../utils/businessVerticalUtils");
const dbUtils = require("../../utils/dbUtils"); // Import the dbUtils module
const graphAPIHelper = require("../../helpers/graphAPIHelper");

//Function to get business profile data
getProfileData = () => {
  return new Promise((resolve, reject) => {
    try {
      const currentUserData = currentUserObj.getCurrentUser();
      let filterParams = {
        merchant_id: currentUserData.merchant_id || null,
        user_id: currentUserData.id || null,
      };

      profileModel
        .fetchProfile(filterParams)
        .then(async (row) => {
          const verticalRow =
            await BusinessVerticalObj.fetchBusinessVerticalById(
              row[0].business_vertical_id
            );
          let output = {
            address: row[0].address,
            email: row[0].email,
            description: row[0].description,
            vertical: verticalRow.vertical_name,
            websites: [],
          };

          resolve(output);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};

//Function to get business profile about data
getProfileAboutData = () => {
  return new Promise((resolve, reject) => {
    try {
      const currentUserData = currentUserObj.getCurrentUser();
      let filterParams = {
        merchant_id: currentUserData.merchant_id || null,
        user_id: currentUserData.id || null,
      };
      let inpParam = {};

      // Call the function to get business profile data
      graphAPIHelper
        .getAPIBusinessProfile(inpParam)
        .then(async (rowData) => {
          let row = rowData.data;

          // Process the business profile data as needed
          console.log("Profile :");
          console.log(row);

          let output = {
            settings: {
              profile: {
                about: {
                  text: row[0].about,
                },
              },
            },
          };
          console.log(output);
          resolve(output);
        })
        .catch((error) => {
          // Handle any errors that occurred during the API request
          console.error("Profile About - Error:", error.message);
        });

      /*  profileModel
        .fetchProfile(filterParams)
        .then(async (row) => {
          const verticalRow =
            await BusinessVerticalObj.fetchBusinessVerticalById(
              row[0].business_vertical_id
            );
          let output = {
            settings: {
              profile: {
                about: {
                  text: row[0].about,
                },
              },
            },
          };

          resolve(output);
        })
        .catch((error) => {
          reject(error);
        });
      */
    } catch (error) {
      reject(error);
    }
  });
};

//Function to get business profile photo
getProfileImage = () => {
  return new Promise((resolve, reject) => {
    try {
      const currentUserData = currentUserObj.getCurrentUser();
      let filterParams = {
        merchant_id: currentUserData.merchant_id || null,
        user_id: currentUserData.id || null,
      };

      profileModel
        .fetchProfile(filterParams)
        .then(async (row) => {
          const profilePhoto = row[0].profile_photo;
          resolve(profilePhoto);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};

updateProfileImage = (fileData) => {
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
      const result = await profileModel.updateProfileImg(profileId, fileData);
      if (!result) {
        // If the update result is not available, reject with an error message
        reject({ status: 404, message: "Something went wrong" });
      }

      // Destructure the result object to extract the affectedRows, changedRows, and info properties
      // These properties are typically provided by the database query result and represent the outcome of the update operation
      // - affectedRows: Number of rows affected by the update query
      // - changedRows: Number of rows actually changed by the update query (might be the same as affectedRows or less depending on the update criteria)
      // - info: Additional information or metadata related to the update operation, such as database-specific details or execution status
      const { affectedRows, changedRows, info } = result;

      const message = !affectedRows
        ? "User not found"
        : affectedRows && changedRows
        ? "User profile photo updated successfully"
        : "Profile photo updation failed";

      const output = { message, info };

      resolve(output);
    } catch (error) {
      // If an error occurs, reject with the error object
      reject(error);
    }
  });
};

// Delete user profile image
deleteProfileImage = () => {
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

      const result = await profileModel.deleteProfileImg(profileId);
      if (!result) {
        // If the update result is not available, reject with an error message
        reject({ status: 404, message: "Something went wrong" });
      }

      // Destructure the result object to extract the affectedRows, changedRows, and info properties
      // These properties are typically provided by the database query result and represent the outcome of the update operation
      // - affectedRows: Number of rows affected by the update query
      // - changedRows: Number of rows actually changed by the update query (might be the same as affectedRows or less depending on the update criteria)
      // - info: Additional information or metadata related to the update operation, such as database-specific details or execution status
      const { affectedRows, changedRows, info } = result;

      const message = !affectedRows
        ? "User not found"
        : affectedRows && changedRows
        ? "User profile photo deleted successfully"
        : "Profile photo deletion failed";

      const output = { message, info };

      resolve(output);
    } catch (error) {
      // If an error occurs, reject with the error object
      reject(error);
    }
  });
};

updateProfileData = (profileData) => {
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
      const result = await profileModel.updateProfile(profileId, profileData);
      if (!result) {
        // If the update result is not available, reject with an error message
        reject({ status: 404, message: "Something went wrong" });
      }

      // Destructure the result object to extract the affectedRows, changedRows, and info properties
      // These properties are typically provided by the database query result and represent the outcome of the update operation
      // - affectedRows: Number of rows affected by the update query
      // - changedRows: Number of rows actually changed by the update query (might be the same as affectedRows or less depending on the update criteria)
      // - info: Additional information or metadata related to the update operation, such as database-specific details or execution status
      const { affectedRows, changedRows, info } = result;

      const message = !affectedRows
        ? "User not found"
        : affectedRows && changedRows
        ? "Profile about text updated successfully"
        : "Profile about text updation failed";

      const output = { message, info };

      resolve(output);
    } catch (error) {
      reject(error);
    }
  });
};

//Export the Profile Service
module.exports = {
  getProfileData,
  getProfileAboutData,
  getProfileImage,
  updateProfileImage,
  deleteProfileImage,
  updateProfileData,
};
