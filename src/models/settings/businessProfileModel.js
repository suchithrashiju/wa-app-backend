/**
 * Business profile Model
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 12, 2023
 * Description: Model for representing the business profile data structure and database interactions
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

// Defines the businessProfileModel class
class BusinessProfileModel {
  tableName = "bwcrm_business_profiles"; // Specify the table name

  fetchBusinessProfile = (params = {}) => {
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

  updateBusinessProfileDetail = (profileId, columns) => {
    return new Promise(async (resolve, reject) => {
      try {
        const columnUpdates = Object.entries(columns)
          .map(([key, value]) => `${key} = ?`)
          .join(", ");
        const sql = `UPDATE ${this.tableName} SET ${columnUpdates} WHERE profile_id = ?`;

        const values = [...Object.values(columns), profileId];
        query(sql, values)
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
}

//Export an instance of the BusinessProfileModel Class
module.exports = new BusinessProfileModel();
