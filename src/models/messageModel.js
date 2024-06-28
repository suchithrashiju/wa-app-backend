/**
 * Message Model
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 11, 2023
 * Description: Represents a message in the application
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
const cryptoHelper = require("../helpers/cryptoHelper");

// Import the multipleColumnSet, multipleColumnSetAndClause from the commonUtils module
const {
  multipleColumnSet,
  multipleColumnSetAndClause,
} = require("../utils/commonUtils");

// Defines the MessageModel Class
class MessageModel {
  tableName = "bwcrm_messages"; // Specify the table name

  // Method to retrieve multiple rows from the table
  findAllMessages = (params = {}, limit) => {
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

  findWebhookMessageByWAId = async (params) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { columnSet, values } = multipleColumnSet(params); // Generate columnSet and values for the WHERE clause

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`; // SQL query to select a single row with the specified conditions
        query(sql, values)
          .then((row) => {
            if (row) {
              resolve(row);
            } else {
              resolve(row); // Resolve the promise with the query row
            }
          })
          .catch((error) => {
            reject(error); // Reject the promise with the error if there was an error with executing the query
          });
      } catch (error) {
        reject(error); // Reject the promise with the error if there was an error with executing the query
      }
    });
  };

  insertMessage = (inpParams = {}) => {
    return new Promise((resolve, reject) => {
      try {
        inpParams.created_at = new Date();
        inpParams.created_by = inpParams.user_id;
        inpParams.status = 0;
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

  //******webhook section start************ */

  // Method to retrieve multiple rows from the table
  findAllwebhookdata = (params = {}, limit) => {
    return new Promise((resolve, reject) => {
      let wa_id = params.wa_id;
      let sql = `SELECT * from ${this.tableName} WHERE wa_id=${wa_id}  `; //SQL query to select all rows from the table
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
    });
  };

  getLastMessageByWAId = async (params) => {
    let cond = "";
    if (params.flag) {
      cond = ` AND flag=${params.flag} `;
    }
    const sql = `SELECT * FROM ${this.tableName}
        WHERE wa_id=${params.wa_id} ${cond} ORDER BY message_id DESC LIMIT 1`; // SQL query to select a single row with the specified conditions
    const result = await query(sql); // Execute the query and wait for the result

    // Return the first row (user)
    return result[0];
  };
  insertWebhookData = (inpParams = {}) => {
    return new Promise((resolve, reject) => {
      try {
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
              reason: "Webhook data saved",
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

  updateWebhookData = (messageId, columns) => {
    return new Promise(async (resolve, reject) => {
      try {
        const columnUpdates = Object.entries(columns)
          .map(([key, value]) => `${key} = ?`)
          .join(", ");
        const sql = `UPDATE ${this.tableName} SET ${columnUpdates} WHERE message_id = ?`;

        const values = [...Object.values(columns), messageId];
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

  findAllContactPersonsFromWebhookData = (params = {}) => {
    return new Promise((resolve, reject) => {
      let limit = params.limit;
      let cond = "";
      let sql = `SELECT distinct wa_id from ${this.tableName}  ${cond}  `; //SQL query to select all rows from the table

      if (limit != null && limit != undefined) {
        sql += ` LIMIT ${limit}`; // Append the LIMIT clause to the SQL query if a non-null limit value is provided
      }
      query(sql)
        .then((result) => {
          console.log(result);
          let contact_noarr = [];
          if (result.length > 0) {
            result.forEach((rowval) => {
              contact_noarr.push(rowval.wa_id);
            });
          }
          resolve(contact_noarr); // Resolve the promise with the query result
        })
        .catch((error) => {
          reject(error); // Reject the promise with the error if there was an error executing the query
        });
    });
  };

  //*****webhook end*****/
}

// Export an instance of the MessageModel Class
module.exports = new MessageModel();
