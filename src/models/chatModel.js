/**
 * Chat Model
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 11, 2023
 * Description: Represents a chat in the application
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

// Defines the ChatModel Class
class ChatModel {
  tableName = "bwcrm_chats"; // Specify the table name

  // Method to retrieve multiple rows from the table
  findAllChats = (params = {}, limit) => {
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

  findChatById = (params = {}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { columnSet, values } = multipleColumnSetAndClause(params); // Generate columnSet and values for the WHERE clause

        const sql = `SELECT * FROM ${this.tableName} WHERE ${columnSet}`; // SQL query to select a single row with the specified conditions

        const result = await query(sql, [...values]); // Execute the query and wait for the result
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

  insertChat = (inpParams = {}) => {
    return new Promise((resolve, reject) => {
      try {
        inpParams.created_at = new Date();
        inpParams.created_by = inpParams.user_id;

        const keys = Object.keys(inpParams);
        const values = Object.values(inpParams);

        const placeholders = keys.map(() => "?").join(", ");
        const sql = `INSERT INTO ${this.tableName} (${keys.join(
          ", "
        )}) VALUES (${placeholders})`;
        query(sql, [...values]) // Execute the query with the provided values
          .then((result) => {
            const lastInsertedId = result.insertId;
            const encryptedId = cryptoHelper.encryptData(lastInsertedId);
            let returnResult = {
              reason:
                "Message is saved and will be sent as soon as other messages currently pending for this user are delivered.",
              id: encryptedId,
            };
            resolve(returnResult);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  };
}

// Export an instance of the ChatModel Class
module.exports = new ChatModel();
