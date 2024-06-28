/**
 * Business Vertical Utils
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 12, 2023
 * Description: Utility functions for handling business vertical-related operations and calculations
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

// Import the Sequelize model for the BusinessVertical table
const BusinessVerticalModel = require("../models/settings/businessVerticalModel");
const currentUserObj = require("../utils/currentUserUtils");

// Fetch all business verticals from the database
const fetchBusinessVerticals = async () => {
  try {
    const currentUserData = currentUserObj.getCurrentUser();
    const filterParams = {};
    const businessVerticals =
      await BusinessVerticalModel.findAllBusinessVerticals(filterParams);
    return businessVerticals;
  } catch (error) {
    throw new Error("Error fetching business verticals from the database");
  }
};

// Fetch all business verticals from the database
const fetchBusinessVerticalById = async (verticalId) => {
  try {
    const currentUserData = currentUserObj.getCurrentUser();
    const filterParams = {
      vertical_id: verticalId,
    };
    const businessVerticalData =
      await BusinessVerticalModel.findBusinessVerticalById(filterParams);
    return businessVerticalData;
  } catch (error) {
    throw new Error("Error fetching business verticals from the database");
  }
};

// Export the function to be used in other parts of the application
module.exports = {
  fetchBusinessVerticals,
  fetchBusinessVerticalById,
};
