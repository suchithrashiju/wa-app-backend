/**
 * Common Utils
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 8, 2023
 * Description: Contains utility functions that are commonly used throughout the application.
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

// Function to generate columnSet and values for an object
exports.multipleColumnSet = (object) => {
  // Check if the input is an object or an array of objects
  if (
    typeof object !== "object" ||
    (Array.isArray(object) && object.length === 0)
  ) {
    throw new Error("Invalid input");
  }

  const objects = Array.isArray(object) ? object : [object]; // Convert a single object to an array of objects if needed

  const columnSets = objects.map((obj) => {
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    const columnSet = keys.map((key) => `${key} = ?`).join(", ");
    return {
      columnSet,
      values,
    };
  });

  const concatenatedColumnSet = columnSets.map((cs) => cs.columnSet).join(", ");
  const concatenatedValues = [].concat(...columnSets.map((cs) => cs.values));

  return {
    columnSet: concatenatedColumnSet,
    values: concatenatedValues,
  };
};

exports.multipleColumnSetOld = (object) => {
  // Check if the input is an object
  if (typeof object !== "object") {
    throw new Error("Invalid input"); // Throw an error if the input is not an object
  }

  const keys = Object.keys(object); // Get the keys (property names) of the object
  const values = Object.values(object); // Get the values of the object

  columnSet = keys.map((key) => `${key} = ?`).join(", "); // Generate the columnSet by mapping keys to "key = ?" format and joining with commas

  return {
    columnSet, // Return the columnSet
    values, // Return the values
  };
};

exports.multipleColumnSetAndClause = (filterParams) => {
  const columns = Object.keys(filterParams); // Get the keys (property names) of the object
  const values = Object.values(filterParams); // Get the values of the object
  let columnSet = "";

  if (columns.length === 0) {
    return { columnSet, values }; // Return the columnSet and values null
  }

  columnSet = columns.map((column) => `${column} = ?`).join(" AND "); // Generate the columnSet by mapping keys to "key = ?" format and joining with AND

  return { columnSet, values }; // Return the columnSet and values
};

// Sample function to verify a single contact phone number
exports.verifyContact = (phoneNumber) => {
  // Regular expression to check for the recommended format with a plus sign (+) and country code
  const phoneNumberRegex = /^\+\d{1,3}\s?\d{1,14}$/;

  return phoneNumberRegex.test(phoneNumber);
};

exports.formatPhoneNumberForWaID = (phoneNumber) => {
  // Remove non-numeric characters from the phone number
  const numericPhoneNumber = phoneNumber.replace(/\D/g, "");

  // Assuming the country code is always '1' for this example
  // const countryCode = "1";

  // Prepend the country code to the numeric phone number
  // const formattedWaID = countryCode + numericPhoneNumber;

  const formattedWaID = numericPhoneNumber;

  return formattedWaID;
};

exports.checkAndAddCountryCode = (number) => {
  if (!number.startsWith("91")) {
    return "91" + number;
  }
  return number;
};
