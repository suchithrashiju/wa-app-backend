/**
 * Profile Controller
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 12, 2023
 * Description: Controller for handling API requests related to the  profile settings
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
const profileService = require("../../services/settings/profileService");
const commonHelper = require("../../helpers/commonHelper");

const multer = require("multer");

const storage = multer.memoryStorage(); // Use memory storage to keep the uploaded file in memory
const upload = multer({ storage }); // Create the multer middleware

const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              Profile  Controller
 *****************************************************************************/

// Fetch  profile detail
getProfileDetail = async (req, res) => {
  try {
    const profileData = await profileService.getProfileData();
    res.send(profileData);
  } catch (error) {
    console.error("Error fetching user profile:", error.message);

    res
      .status(error.status || 500)
      .send({ status: "FAILED", data: error.message || error });
  }
};

// Fetch  profile detail
getProfileAboutDetail = async (req, res) => {
  try {
    const profileData = await profileService.getProfileAboutData();
    res.send(profileData);
  } catch (error) {
    console.error("Error fetching Whatsapp profile about text:", error.message);

    res
      .status(error.status || 500)
      .send({ status: "FAILED", data: error.message || error });
  }
};

// Fetch profile Photo
getProfilePhoto = async (req, res) => {
  try {
    const profileData = await profileService.getProfileImage();
    res.set("Content-Type", "image/jpeg"); // Replace 'image/jpeg' with the appropriate content type if needed
    res.set("Content-Length", profileData.length); // Set the appropriate length of the binary image content
    res.send(profileData);
  } catch (error) {
    console.error("Error fetching user profile photo:", error.message);

    res
      .status(error.status || 500)
      .send({ status: "FAILED", data: error.message || error });
  }
};

// Update profile Photo
updateProfilePhoto = async (req, res) => {
  try {
    upload.single("file_encoded")(req, res, async (err) => {
      if (err) {
        // Handle any multer-related errors
        return res.status(500).json({ error: err.message });
      }

      // Access the uploaded file in req.file
      const file = req.file; // Uploaded file object

      if (!file) {
        // Handle case when file_encoded field is missing
        return res.status(400).json({ error: "Profile photo is missing" });
      }

      // Access the binary data from the file buffer
      const fileEncodedData = file.buffer; // Binary data of the file
      const updatedProfileData = await profileService.updateProfileImage(
        fileEncodedData
      );
      res.send(updatedProfileData);
    });
  } catch (error) {
    console.error("Error updating user profile photo:", error.message);

    res
      .status(error.status || 500)
      .send({ status: "FAILED", data: error.message || error });
  }
};

deleteProfilePhoto = async (req, res) => {
  try {
    const responseData = await profileService.deleteProfileImage();
    res.send(responseData);
  } catch (error) {
    console.error("Error deleting user profile photo:", error.message);

    res
      .status(error.status || 500)
      .send({ status: "FAILED", data: error.message || error });
  }
};

//Update updateProfile

updateProfileAbout = async (req, res) => {
  try {
    const profileData = { about: req.body.text };

    const responseData = await profileService.updateProfileData(profileData);
    res.send(responseData);
  } catch (error) {
    console.error("Error updating business profile about text:", error.message);

    res
      .status(error.status || 500)
      .send({ status: "FAILED", data: error.message || error });
  }
};
/******************************************************************************
 *                              Export Controller
 *****************************************************************************/

// Export the Profile  Controller
module.exports = {
  getProfileDetail,
  getProfileAboutDetail,
  getProfilePhoto,
  updateProfilePhoto,
  deleteProfilePhoto,
  updateProfileAbout,
};
