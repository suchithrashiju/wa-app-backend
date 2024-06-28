/**
 * GraphAPI Helper
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 25, 2023
 * Description:
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

// Import necessary dependencies

var axios = require("axios");
const FormData = require("form-data");

async function getAccessToken() {
  try {
    const response = await axios.get(
      `https://graph.facebook.com/oauth/access_token?client_id=${process.env.APP_ID}&client_secret=${process.env.APP_SECRET}&grant_type=client_credentials`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    if (response.data && response.data.access_token) {
      return response.data.access_token;
    } else {
      throw new Error("Failed to obtain access token.");
    }
  } catch (error) {
    console.error("Error obtaining access token:", error.message);
    throw error;
  }
}

async function getAPIBusinessProfile(params = {}) {
  const defaultParams = {
    access_token: process.env.ACCESS_TOKEN,
    fields:
      "fields=profile_picture_url,websites,vertical,messaging_product,about,address,description,email",
    // limit: 3,
  };

  const mergedParams = { ...defaultParams, ...params };
  console.log(defaultParams);
  console.log(
    `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/whatsapp_business_profile`
  );

  try {
    const response = await axios.get(
      `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/whatsapp_business_profile`,
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
        params: mergedParams,
      }
    );

    // Return the data containing the business profile data
    return response.data;
  } catch (error) {
    // Handle any errors that occur during the API request
    console.error("Error fetching business profile data:", error.message);
    throw error;
  }
}

async function makeGraphApiRequest(endpoint, params) {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: {
        ...params,
        access_token: process.env.ACCESS_TOKEN,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Graph API request failed: ${error.message}`);
  }
}

async function uploadMediafile(upload_files) {
  try {
    const form = new FormData();
    form.append("file", upload_files.filepath, {
      filename: upload_files.originalFilename,
      contentType: upload_files.mimetype,
    });
    form.append("type", upload_files.mimetype);
    form.append("messaging_product", "whatsapp");

    const response = await axios.post(
      `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/media`,
      form,
      {
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
          ...form.getHeaders(), // Include the necessary headers for form data
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(`Media file Graph API request failed: ${error.message}`);
  }
}
module.exports = {
  getAccessToken: getAccessToken,
  getAPIBusinessProfile: getAPIBusinessProfile,
  makeGraphApiRequest: makeGraphApiRequest,
  uploadMediafile,
};
