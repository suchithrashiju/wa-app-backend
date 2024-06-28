/**
 * Database Connection
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 8, 2023
 * Description: Establishes a connection to the database and provides utility functions for interacting with the database.
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
const dotenv = require("dotenv");
dotenv.config();
const mysql2 = require("mysql2");

class DBConnection {
  constructor() {
    this.db = mysql2.createPool({
      host: process.env.DB_HOST, // Database host
      user: process.env.DB_USER, // Database username
      password: process.env.DB_PASS, // Database password
      database: process.env.DB_DATABASE, // Database name
    });

    this.checkConnection(); // Check the database connection
  }

  checkConnection() {
    this.db.getConnection((err, connection) => {
      if (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
          console.error("Database connection was closed."); // Print an error message if the database connection was closed
        }
        if (err.code === "ER_CON_COUNT_ERROR") {
          console.error("Database has too many connections."); // Print an error message if there are too many database connections
        }
        if (err.code === "ECONNREFUSED") {
          console.error("Database connection was refused."); // Print an error message if the database connection was refused
        }
      }
      if (connection) {
        connection.release(); // Release the database connection
      }
      return;
    });
  }

  query = async (sql, values) => {
    return new Promise((resolve, reject) => {
      const callback = (error, result) => {
        if (error) {
          reject(error); // Reject the promise with the error if there was an error executing the query
          return;
        }
        resolve(result); // Resolve the promise with the query result
      };

      // console.log("SQL Query:", sql);
      // console.log("Query Values:", values);

      // execute will internally call prepare and query
      this.db.execute(sql, values, callback); // Execute the query with the provided SQL statement and values
    }).catch((err) => {
      const mysqlErrorList = Object.keys(HttpStatusCodes);
      // convert mysql errors which in the mysqlErrorList list to http status code
      err.status = mysqlErrorList.includes(err.code)
        ? HttpStatusCodes[err.code] // Map MySQL error codes to corresponding HTTP status codes
        : err.status;

      throw err; // Throw the error
    });
  };
}

// like ENUM
const HttpStatusCodes = Object.freeze({
  ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: 422, // HTTP status code for a wrong value in a field
  ER_DUP_ENTRY: 409, // HTTP status code for duplicate entry
});

module.exports = new DBConnection().query; // Export the query method of a new DBConnection instance
