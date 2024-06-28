/**
 * Profile Model
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 12, 2023
 * Description: Model for representing the profile data structure and database interactions
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

// Import the query function from the dbConnection module
const query = require("../../db/dbConnection");

// Import the multipleColumnSet,multipleColumnSetAndClause from commonUtils module
const {
  multipleColumnSet,
  multipleColumnSetAndClause,
} = require("../../utils/commonUtils");

// Defines the ProfileModel class
class ProfileModel {
  tableName = "bwcrm_business_profiles"; // Specify the table name

  fetchProfile = (params = {}) => {
    return new Promise((resolve, reject) => {
      let sql = ` SELECT * FROM ${this.tableName}`; // SQL query to select a row from the table
      const { columnSet, values } = multipleColumnSetAndClause(params); // Generates the columnSet for the WHERE clause
      if (columnSet) {
        sql += ` WHERE ${columnSet}`; // Append the WHERE clause query to the SQL query if columnSet is not empty
      }

      query(sql, [...values])
        .then((row) => {
          resolve(row); // Resolve the promise with the query row
        })
        .catch((error) => {
          reject(error); // Reject the promise with the error if there was an error with executing the query
        });
    });
  };

  updateProfileImg = (profileId, fileData) => {
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `UPDATE  ${this.tableName} SET profile_photo = ? WHERE profile_id = ?`;
        const params = [fileData, profileId];
        query(sql, params)
          .then((row) => {
            resolve(row); // Resolve the promise with the query row
          })
          .catch((error) => {
            reject(error); // Reject the promise with the error if there was an error with executing the query
          });
      } catch (error) {
        reject(error); // Reject the promise with the error if there was an error with executing the query
      }
    });
  };

  deleteProfileImg = (profileId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `UPDATE  ${this.tableName} SET profile_photo = ? WHERE profile_id = ?`;
        const fileData = null; // Set the fileData to null or the appropriate value

        const params = [fileData, profileId].filter(
          (param) => param !== undefined
        ); // Filter out undefined parameters

        query(sql, params)
          .then((row) => {
            resolve(row); // Resolve the promise with the query row
          })
          .catch((error) => {
            reject(error); // Reject the promise with the error if there was an error with executing the query
          });
      } catch (error) {
        reject(error); // Reject the promise with the error if there was an error with executing the query
      }
    });
  };

  // Method to update a row
  updateProfile = (profileId, params) => {
    return new Promise(async (resolve, reject) => {
      const { columnSet, values } = multipleColumnSet(params); // Generate columnSet and values for the SET clause

      const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE profile_id = ?`; // SQL query to update a row with the specified conditions

      query(sql, [...values, profileId]) // Execute the query and wait for the result
        .then((result) => {
          resolve(result); // Resolve the promise with the query result
        })
        .catch((error) => {
          reject(error); // Reject the promise with the error if there was an error executing the query
        });
      return;
    });
  };
}
//Export an instance of the ProfileModel Class
module.exports = new ProfileModel();
