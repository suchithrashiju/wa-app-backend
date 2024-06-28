/**
 * Current User Utils
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 12, 2023
 * Description: Module for sorting and retrieving for current user details
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

let currentUser = null;

module.exports = {
  /**
   * Get the current user details.
   * @returns {Object|null} The current user details.
   */
  getCurrentUser: () => currentUser,

  /**
   * Set the current user details.
   * @param {Object|null} user - The current user details.
   */
  setCurrentUser: (user) => {
    currentUser = user;
  },
};
