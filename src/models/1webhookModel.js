/**
 * Webhook Model
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: October 05, 2023
 * Description: Represents a webhook in the application
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

// Defines the WebhookModel Class
class WebhookModel {
  tableName = "bwcrm_webhooks"; // Specify the table name

  // Method to retrieve multiple rows from the table
  findAllwebhookdata = (params = {}, limit) => {
    return new Promise((resolve, reject) => {
      let wa_id = params.wa_id;
      let sql = `SELECT * from ${this.tableName} WHERE on_assigned=${wa_id} AND flag=1 `; //SQL query to select all rows from the table
      console.log(sql);
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

  findWebhookMessageByWAId = async (params) => {
    const { columnSet, values } = multipleColumnSet(params); // Generate columnSet and values for the WHERE clause

    const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`; // SQL query to select a single row with the specified conditions

    const result = await query(sql, [...values]); // Execute the query and wait for the result

    // Return the first row (user)
    return result[0];
  };

  getLastMessageByWAId = async (params) => {
    const { columnSet, values } = multipleColumnSetAndClause(params); // Generate columnSet and values for the WHERE clause

    const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet} ORDER BY id DESC LIMIT 1`; // SQL query to select a single row with the specified conditions

    const result = await query(sql, [...values]); // Execute the query and wait for the result

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

  findAllContactPersonsFromWebhookData = (params = {}) => {
    return new Promise((resolve, reject) => {
      let limit = params.limit;
      let cond = "";
      let sql = `SELECT distinct on_assigned from ${this.tableName}  ${cond}  `; //SQL query to select all rows from the table

      if (limit != null && limit != undefined) {
        sql += ` LIMIT ${limit}`; // Append the LIMIT clause to the SQL query if a non-null limit value is provided
      }
      query(sql)
        .then((result) => {
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
}
// Export an instance of the WebhookModel Class
module.exports = new WebhookModel();
