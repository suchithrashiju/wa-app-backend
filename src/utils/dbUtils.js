/**
 * Db Utils
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 14, 2023
 * Description: Database Utility Functions: dbUtils
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
const query = require("../db/dbConnection");

// Import the multipleColumnSet function from the commonUtils module
const {
  multipleColumnSet,
  multipleColumnSetAndClause,
} = require("../utils/commonUtils");

// Fetches the specified field value from the database
fetchField = (tableName, columnName, params = {}, orderby = "") => {
  return new Promise(async (resolve, reject) => {
    try {
      let limit = 1;
      let orderby_cond = "";
      if (orderby != "") {
        orderby_cond = ` ${orderby} `;
      }
      let sql = `SELECT ${columnName} FROM ${tableName}   `; // SQL query to select the specified column from the table
      if (!Object.keys(params).length) {
        // If no params are provided, execute the query without any additional conditions

        if (limit !== null && limit !== undefined) {
          sql += ` LIMIT ${limit}`; // Append the LIMIT clause to the SQL query if a non-null limit value is provided
        }
        query(sql)
          .then((result) => {
            let columnValue = "";
            if (result) {
              columnValue = result[columnName]; // Retrieve the field value from the query result
            }
            resolve(columnValue);
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
      if (orderby != "") {
        sql += `  ${orderby_cond} `;
      }

      if (limit !== null && limit !== undefined) {
        sql += ` LIMIT ${limit}`; // Append the LIMIT clause to the SQL query if a non-null limit value is provided
      }
      query(sql, values)
        .then((result) => {
          let columnValue = "";
          if (result.length) {
            columnValue = result[0][columnName]; // Retrieve the field value from the query result
          }
          resolve(columnValue);
        })
        .catch((error) => {
          reject(error); // Reject the promise with the error if there was an error executing the query
        });
    } catch (error) {
      reject(error);
    }
  });
};

// Fetches the specified columns and their values from the database
fetchColumns = (tableName, columnNames = [], params = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let limit = 1;
      let columnNameStr = columnNames.join(",");
      let sql = `SELECT ${columnNameStr} FROM ${tableName}`; // SQL query to select the specified columns from the table

      if (!Object.keys(params).length) {
        // If no params are provided, execute the query without any additional conditions

        if (limit !== null && limit !== undefined) {
          sql += ` LIMIT ${limit}`; // Append the LIMIT clause to the SQL query if a non-null limit value is provided
        }
        query(sql)
          .then((result) => {
            const columns = {};
            columnNames.forEach((columnName) => {
              columns[columnName] = result[columnName]; // Retrieve the column values from the query result
            });

            resolve(columns);
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
          const columns = {};
          columnNames.forEach((columnName) => {
            columns[columnName] = result[0][columnName]; // Retrieve the column values from the query result
          });
          resolve(columns);
        })
        .catch((error) => {
          reject(error); // Reject the promise with the error if there was an error executing the query
        });
    } catch (error) {
      reject(error);
    }
  });
};

// Export the dbUtils functions
module.exports = {
  fetchField,
  fetchColumns,
};
