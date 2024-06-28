/**
 * User Service
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 8, 2023
 * Description: Provides service functions for managing user-related operations, such as user creation, retrieval, and update.
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

// Import the userModel module
// const { getCurrentUser } = require("../controllers/userController");
const userModel = require("../models/userModel");
const permissionModel = require("../models/permissionModel");
const userGroupModel = require("../models/userGroupModel");
const currentUserObj = require("../utils/currentUserUtils");
const commonHelper = require("../helpers/commonHelper");
const bcrypt = require("bcryptjs");

// Function to get all user results based on filter parameters
getAllUserResults = (reqparams = {}) => {
  return new Promise((resolve, reject) => {
    try {
      const currentUserData = currentUserObj.getCurrentUser();

      const role = "Users";
      const limit = reqparams.limit; // Access the 'limit' parameter from the parameter
      const currentMerchantId = currentUserData.merchant_id;
      const filterParams = {
        merchant_id: currentMerchantId || null,
        role: role || null,
      };

      // const domain = `${reqparams.protocol}://${reqparams.host}`;
      const domain = process.env.APP_API_DOMAIN;
      const requestedUrl = `${domain}${reqparams.baseUrl}`;
      userModel
        .findAllUser(filterParams, limit)
        .then(async (allUsers) => {
          const results = [];

          for (const userData of allUsers) {
            const userId = userData.id;

            const userPermissionList = await permissionModel.findAllPermission({
              user_id: userId,
            });
            const userGroupList = await userGroupModel.findAllUserGroup({
              user_id: userId,
            });

            const transformedResult = {
              url: `${requestedUrl}/${userData.id}/`,
              id: userData.id,
              username: userData.username,
              first_name: userData.first_name,
              last_name: userData.last_name,
              email: userData.email,
              profile: {
                role: userData.role.toLowerCase(),
              },
              groups: userGroupList.map((group) => ({
                id: group.group_id,
                name: group.group_name,
              })),
              permissions: {
                can_use_tags: userPermissionList.some((permission) =>
                  permission.can_use_tags
                    ? Boolean(permission.can_use_tags)
                    : null
                ),
                can_read_chats: userPermissionList.reduce(
                  (result, permission) =>
                    permission.can_read_chats
                      ? permission.can_read_chats
                      : result,
                  null
                ),
                can_write_to_chats: userPermissionList.reduce(
                  (result, permission) =>
                    permission.can_write_chats
                      ? permission.can_write_chats
                      : result,
                  null
                ),
              },
            };

            results.push(transformedResult);
          }

          const output = {
            count: allUsers.length,
            next: null,
            previous: null,
            results,
          };
          // console.log(output);
          resolve(output); // Resolve the promise with the constructed output object
        })
        .catch((error) => {
          reject(error); // Reject the promise with the error if there was an error retrieving the user results
        });
    } catch (error) {
      reject(error); // Reject the promise with the error if there was an error executing the function
    }
  });
};

// Function to get details of one user based on email
getOneUser = (email) => {
  try {
    const user = userModel.findOne(email); // Retrieve details of the user with the specified email
    return user; // Return the user details
  } catch (error) {
    throw error; // Throw the error
  }
};

//Function to get details of loggined user

getCurrentUserData = (reqParams = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const currentUserData = currentUserObj.getCurrentUser();

      // const domain = `${reqParams.protocol}://${reqParams.host}`;
      const domain = process.env.APP_API_DOMAIN;
      const requestedUrl = `${domain}${reqParams.baseUrl}`;
      const currentUserId = currentUserData.id;

      const userPermissionList = await permissionModel.findAllPermission({
        merchant_id: currentUserData.merchant_id,
        user_id: currentUserId,
      });
      const userGroupList = await userGroupModel.findAllUserGroup({
        merchant_id: currentUserData.merchant_id,
        user_id: currentUserId,
      });

      const output = {
        url: `${requestedUrl}/${currentUserData.id}/`,
        id: currentUserData.id,
        username: currentUserData.username,
        first_name: currentUserData.first_name,
        last_name: currentUserData.last_name,
        email: currentUserData.email,
        profile: {
          role: currentUserData.role.toLowerCase(),
        },
        groups: userGroupList.map((group) => ({
          id: group.group_id,
          name: group.group_name,
        })),
        permissions: {
          can_use_tags: userPermissionList.some((permission) =>
            permission.can_use_tags ? Boolean(permission.can_use_tags) : null
          ),
          can_read_chats: userPermissionList.reduce(
            (result, permission) =>
              permission.can_read_chats ? permission.can_read_chats : result,
            null
          ),
          can_write_to_chats: userPermissionList.reduce(
            (result, permission) =>
              permission.can_write_chats ? permission.can_write_chats : result,
            null
          ),
        },
      };

      resolve(output);
    } catch (error) {
      reject(error); // Reject the promise with the error if there was an error executing the function
    }
  });
};
// Update password
updatePassword = (reqParams) => {
  return new Promise(async (resolve, reject) => {
    try {
      const currentUserData = currentUserObj.getCurrentUser();
      if (!currentUserData) {
        // If current user data is not found, reject with a 404 error
        reject({ status: 404, message: "User not found" });
      }

      const passwordMatch = await bcrypt.compare(
        reqParams.current_password,
        currentUserData.password
      );

      if (!passwordMatch) {
        // If old password does not match, reject with an error message
        reject({ status: 404, message: "Incorrect old password" });
      }

      commonHelper.checkValidation(reqParams);
      // Perform validation checks on reqParams using commonHelper module

      await commonHelper.hashPasswordNew(reqParams);
      // Hash the new password in reqParams using commonHelper module

      const { current_password, ...restOfUpdates } = reqParams;
      // Extract current_password from reqParams and store the rest of the properties in restOfUpdates

      // Perform the update query and get the result
      // The update can be partial
      const result = await userModel.updateUserDetail(
        restOfUpdates,
        currentUserData.id
      );

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
        ? "User updated successfully"
        : "Updated failed";

      const output = { message, info };

      resolve(output);
    } catch (error) {
      // If an error occurs, reject with the error object
      reject(error);
    }
  });
};

// Export the functions as an object
module.exports = {
  getAllUserResults,
  getOneUser,
  getCurrentUserData,
  updatePassword,
};
