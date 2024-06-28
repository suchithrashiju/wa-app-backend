/**
 * Template Model
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 11, 2023
 * Description: Represents a template in the application
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

// Import necesasary dependencies

//Import the query function from the dbConnection module
const query = require("../db/dbConnection");

// Import the multipleColumnSet, multipleColumnSetAndClause from the commonUtils module
const {
  multipleColumnSet,
  multipleColumnSetAndClause,
} = require("../utils/commonUtils");

// Defines the TemplateModel Class
class TemplateModel {
  tableName = "bwcrm_templates"; // Specify the table name

  // Method to retrieve multiple rows from the table
  findAllTemplates = (params = {}, limit) => {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * from ${this.tableName}`; //SQL query to select all rows from the table
      if (!Object.keys(params).length) {
        // If no parameters are provided, executed the query without any condition
        if (limit != null && limit != undefined) {
          sql += ` LIMIT ${limit}`; // Append the LIMIT clause to the SQL query if a non-null limit value is provided
        }
        query(sql)
          .then((results) => {
            resolve(results); // Resolve the promise with the query result
          })
          .catch((error) => {
            reject(error); // Reject the promise with the error if there was an error executing the query
          });
      }

      const { columnSet, values } = multipleColumnSetAndClause(params); // Generate columnSet and values for the WHERE clause
      if (columnSet) {
        sql += ` WHERE ${columnSet}`; // Append the WHERE clause to the SQL query if columnSet is not empty
      }

      if (limit != null && limit != undefined) {
        sql += ` LIMIT ${limit}`; // Append the LIMIT clause to the SQL query if a non-null limit value is provided
      }
      query(sql, [...values])
        .then((results) => {
          resolve(results); // Resolve the promise with the query result
        })
        .catch((error) => {
          reject(error); // Reject the promise with the error if there was an error executing the query
        });
    });
  };
}

// Export an instance of the TemplateModel Class
module.exports = new TemplateModel();
