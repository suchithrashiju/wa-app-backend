/**
 * Business Vertical Model
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 12, 2023
 * Description: Model representing the structure and database interactions for the business verticals data
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

// Import the multipleColumnSet,multipleColumnSetAndClause form the commonUtils module
const {
  multipleColumnSet,
  multipleColumnSetAndClause,
} = require("../../utils/commonUtils");

// Defines the Business Vertical Model
class BusinessVerticalModel {
  tableName = "bwcrm_business_verticals"; // Specify the table name

  findAllBusinessVerticals = (params = {}) => {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM ${this.tableName}`; // SQL query to fetch all business vertical data

      if (!Object.keys(params).length) {
        // if no parameters provides, executes the SQL query without any condition
        query(sql)
          .then((results) => {
            resolve(results); // Resolve the promise with the query result
          })
          .catch((error) => {
            reject(error); // Reject the promise with the error if there was an error with executing the query
          });
        return;
      }

      const { columnSet, values } = multipleColumnSetAndClause(params); // Generates the columnSet and values for the WHERE clause query

      if (columnSet) {
        // Append the WHERE Clause to the sql query if columnSet is not empty
        sql += ` WHERE ${columnSet} `;
      }

      query(sql, [...values])
        .then((results) => {
          resolve(results); // Resolve the promise with the query result
        })
        .catch((error) => {
          reject(error); // Reject the promise with the error if there was an error with executing the query
        });
    });
  };

  // Fetch business vertical details by given vertical id
  findBusinessVerticalById = (params) => {
    return new Promise((resolve, reject) => {
      const { columnSet, values } = multipleColumnSet(params); // Generate columnSet and values for the WHERE clause

      const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`; // SQL query to select a single row with the specified conditions

      query(sql, [...values])
        .then((result) => {
          resolve(result[0]); // Resolve the promise with the query result the first row
        })
        .catch((error) => {
          reject(error); // Reject the promise with the error if there was an error with executing the query
        });
    });
  };
}

// Export an instance of BusinessVerticalModel class
module.exports = new BusinessVerticalModel();
