/**
 * User Model
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 8, 2023
 * Description: Represents a user in the application.
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

// Import the Role object from the userRolesUtils module
const Role = require("../utils/userRolesUtils");

// Define the UserModel class
class UserModel {
  tableName = "bwcrm_users"; // Specify the table name

  // Method to retrieve multiple rows from the table
  findAllUser = (params = {}, limit) => {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM ${this.tableName}`; // SQL query to select all rows from the table

      if (!Object.keys(params).length) {
        // If no params are provided, execute the query without any additional conditions

        if (limit !== null && limit !== undefined) {
          sql += ` LIMIT ${limit}`; // Append the LIMIT clause to the SQL query if a non-null limit value is provided
        }
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

      if (columnSet) {
        sql += ` WHERE ${columnSet}`; // Append the WHERE clause to the SQL query if columnSet is not empty
      }

      if (limit !== null && limit !== undefined) {
        sql += ` LIMIT ${limit}`; // Append the LIMIT clause to the SQL query if a non-null limit value is provided
      }

      query(sql, values)
        .then((result) => {
          resolve(result); // Resolve the promise with the query result
        })
        .catch((error) => {
          reject(error); // Reject the promise with the error if there was an error executing the query
        });
    });
  };

  // Method to update a row
  updateUserDetail = (params, id) => {
    return new Promise(async (resolve, reject) => {
      const { columnSet, values } = multipleColumnSet(params); // Generate columnSet and values for the SET clause

      const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`; // SQL query to update a row with the specified conditions

      query(sql, [...values, id]) // Execute the query and wait for the result
        .then((result) => {
          resolve(result); // Resolve the promise with the query result
        })
        .catch((error) => {
          reject(error); // Reject the promise with the error if there was an error executing the query
        });
      return;
    });
  };

  // Method to retrieve a single row from the table
  findOne = async (params) => {
    const { columnSet, values } = multipleColumnSet(params); // Generate columnSet and values for the WHERE clause

    const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`; // SQL query to select a single row with the specified conditions

    const result = await query(sql, [...values]); // Execute the query and wait for the result

    // Return the first row (user)
    return result[0];
  };

  // Method to create a new row
  create = async ({
    first_name,
    last_name,
    email,
    mobile,
    address,
    username,
    password,
  }) => {
    const sql = `INSERT INTO ${this.tableName}
      (first_name, last_name, email, mobile, address, username, password, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`; // SQL query to insert a new row

    const result = await query(sql, [
      first_name,
      last_name,
      email,
      mobile,
      address,
      username,
      password,
    ]); // Execute the query with the provided values

    const affectedRows = result ? result.affectedRows : 0; // Get the number of affected rows

    return affectedRows; // Return the number of affected rows
  };

  // Method to update a row
  update = async (params, id) => {
    const { columnSet, values } = multipleColumnSet(params); // Generate columnSet and values for the SET clause

    const sql = `UPDATE user SET ${columnSet} WHERE id = ?`; // SQL query to update a row with the specified conditions

    const result = await query(sql, [...values, id]); // Execute the query and wait for the result

    return result; // Return the query result
  };

  // Method to delete a row
  delete = async (id) => {
    const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`; // SQL query to delete a row with the specified id

    const result = await query(sql, [id]); // Execute the query with the provided id

    const affectedRows = result ? result.affectedRows : 0; // Get the number of affected rows

    return affectedRows; // Return the number of affected rows
  };
}

// Export an instance of the UserModel class
module.exports = new UserModel();
