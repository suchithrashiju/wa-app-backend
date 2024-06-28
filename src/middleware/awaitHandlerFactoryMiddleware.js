/**
 * Await Handler Factory
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 8, 2023
 * Description: Factory function for handling async/await errors in Express route handlers.
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
const awaitHandlerFactory = (middleware) => {
  return async (req, res, next) => {
    try {
      await middleware(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};

module.exports = awaitHandlerFactory;
