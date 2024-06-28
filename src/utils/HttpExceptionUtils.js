/**
 * Http Exception Utils
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 8, 2023
 * Description: Contains utility functions for handling HTTP exceptions and generating standardized error responses.
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

// Define the HttpException class that extends the Error class
class HttpException extends Error {
  constructor(status, message, data) {
    super(message); // Call the constructor of the Error class with the provided message

    this.status = status; // Assign the provided status to the 'status' property of the HttpException instance
    this.message = message; // Assign the provided message to the 'message' property of the HttpException instance
    this.data = data; // Assign the provided data to the 'data' property of the HttpException instance
  }
}

module.exports = HttpException; // Export the HttpException class
