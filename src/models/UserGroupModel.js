/**
 * UserGroup Model
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 10, 2023
 * Description: Represents a permission in the application.
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
const query = require("../db/dbConnection");

// Import the multipleColumnSet function from the commonUtils module
const {
  multipleColumnSet,
  multipleColumnSetAndClause,
} = require("../utils/commonUtils");

// Define the UserGroupModel class
class UserGroupModel {
  tableName = "bwcrm_user_groups"; // Specify the table name

  // Method to retrieve multiple rows from the table
  findAllUserGroup = (params = {}) => {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM ${this.tableName}`; // SQL query to select all rows from the table

      if (!Object.keys(params).length) {
        // If no params are provided, execute the query without any additional conditions
        query(sql)
          .then((result) => {
            resolve(result); // Resolve the promise with the query result
          })
          .catch((error) => {
            reject(error); // Reject the promise with the error if there was an error executing the query
          });
        return;
      }

      const { columnSet, values } = multipleColumnSetAndClause(params); // Generate columnSet and values for the WHERE clause
      sql += ` WHERE ${columnSet}`; // Append the WHERE clause to the SQL query

      query(sql, [...values])
        .then((result) => {
          resolve(result); // Resolve the promise with the query result
        })
        .catch((error) => {
          reject(error); // Reject the promise with the error if there was an error executing the query
        });
    });
  };

  // Method to retrieve a single row from the table
  findOneUserGroup = async (params) => {
    const { columnSet, values } = multipleColumnSet(params); // Generate columnSet and values for the WHERE clause

    const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`; // SQL query to select a single row with the specified conditions

    const result = await query(sql, [...values]); // Execute the query and wait for the result

    // Return the first row (permission)
    return result[0];
  };
}

// Export an instance of the UserGroupModel class
module.exports = new UserGroupModel();
