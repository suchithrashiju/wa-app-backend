/**
 * Person Model
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 14, 2023
 * Description: Represents a person in the application 
 * Persons: WhatsApp Users who contacted your Inbox
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

// Defines the PersonModel Class
class PersonModel {
  tableName = "bwcrm_persons"; // Specify the table name

  // Method to retrieve multiple rows from the table
  findAllPersons = (params = {}) => {
    return new Promise((resolve, reject) => {
      const { limit, search, offset } = params;
      let sql = `SELECT * from ${this.tableName}`; //SQL query to select all rows from the table

      let newParams = {
        merchant_id: params.merchant_id,
        user_id: params.user_id,
      };
      const { columnSet, values } = multipleColumnSetAndClause(newParams); // Generate columnSet and values for the WHERE clause
      if (columnSet) {
        sql += ` WHERE ${columnSet}`; // Append the WHERE clause to the SQL query if columnSet is not empty
      }

      if (search != null && search != undefined) {
        sql += ` AND ( wa_id LIKE '%${search}%' OR  person_name LIKE '%${search}%'  ) `;
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

  getPersonByWAId = (params = {}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { columnSet, values } = multipleColumnSetAndClause(params);
        const sql = `SELECT * from ${this.tableName} WHERE ${columnSet}`;
        const result = await query(sql, [...values]);
        // console.log(result);
        if (!result) {
          // Resolve the first row (user)
          resolve(result[0]);
        } else {
          resolve(null);
        }
      } catch (error) {
        reject(error);
      }
    });
  };
}
// Export an instance of the PersonModel Class
module.exports = new PersonModel();
