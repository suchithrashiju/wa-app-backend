/**
 * Media Controller
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 11, 2023
 * Description: Handles media-related operations
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
const mediaService = require("../services/mediaService");
const { validateMediaSize, mediaLimits } = require("../helpers/commonHelper");
const formidable = require("formidable");
const dotenv = require("dotenv");
const graphAPIHelper = require("../helpers/graphAPIHelper");
const messageService = require("../services/messageService");
const cryptoHelper = require("../helpers/cryptoHelper");

const fs = require("fs");
const path = require("path");
var axios = require("axios");
const FormData = require("form-data");
dotenv.config();

/******************************************************************************
 *                              Media Controller
 *****************************************************************************/

// get all medias
getAllMediaDetails = async (req, res) => {
  try {
    let reqParams = {
      limit: req.query.limit || null,
      search: req.query.search || null,
      pages: req.query.pages || null,
      original_url: req.originalUrl || null,
    };
    const medias = await mediaService.getAllMediaResults(reqParams);
    // if (medias.count == 0) {
    //   throw new HttpException(404, "Medias not found");
    // }
    res.send(medias);
  } catch (error) {
    res.status(error.status || 500).send({
      status: "FAILED",
      data: error.media || error,
    });
  }
};

// Update Image and send Message

uploadAndSendMedia = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Media could not be uploaded",
      });
    }

    if (!files.file_encoded) {
      return res.status(400).json({
        error: "Media File is required",
      });
    }
    let upload_files = files.file_encoded;
    const domain = process.env.APP_API_DOMAIN;
    const requestedUrl = `${domain}${req.baseUrl}`;
    if (upload_files) {
      let isFileValidSize = validateMediaSize(
        upload_files.size,
        upload_files.mimetype
      );
      if (!isFileValidSize) {
        return res.status(400).json({
          error: `Media File size should be less than ${mediaLimits(
            upload_files.mimetype
          )}`,
        });
      }
    }
    let typeSplit = upload_files.mimetype.split("/");
    let type_mime = typeSplit[0];
    let type_extenstion = typeSplit[1];
    const responseData = await graphAPIHelper.uploadMediafile(upload_files);
    const media_crypt_id = cryptoHelper.encryptData(responseData.id);

    /*    
    {
      file: "https://3b99e38208f6.inbox.platform.get.chat/api/v1/media/5e26c45e-eef1-434f-b108-ae34b89c276c?mime_type_type=image&mime_type_subtype=jpeg",
      id: "5e26c45e-eef1-434f-b108-ae34b89c276c",
    }*/
    let returnResult = {
      file:
        requestedUrl +
        "/" +
        media_crypt_id +
        "?mime_type_type=" +
        type_mime +
        "&mime_type_subtype=" +
        type_extenstion,
      id: media_crypt_id,
    };
    res.send(returnResult);
  });
};
uploadAndSendMedia00 = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Media could not be uploaded",
      });
    }

    if (!files.file_encoded) {
      return res.status(400).json({
        error: "Media File is required",
      });
    }
    let upload_files = files.file_encoded[0];

    if (upload_files) {
      let isFileValidSize = validateMediaSize(
        upload_files.size,
        upload_files.mimetype
      );
      if (!isFileValidSize) {
        return res.status(400).json({
          error: `Media File size should be less than ${mediaLimits(
            upload_files.mimetype
          )}`,
        });
      }
    }

    const form = new FormData();
    form.append("file", upload_files.filepath, {
      filename: upload_files.originalFilename,
      contentType: upload_files.mimetype,
    });
    form.append("type", upload_files.mimetype);
    form.append("messaging_product", "whatsapp");

    const response = await axios
      .post(
        `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/videos`,
        form,
        {
          headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            ...form.getHeaders(), // Include the necessary headers for form data
          },
        }
      )
      .then((response) => {
        // Handle the response here
        console.log("Response:", response.data);
        // console.log(response);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error:", error);
      });
  });
};
uploadAndSendMediaImage = async (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Media could not be uploaded",
      });
    }

    if (!files.file_encoded) {
      return res.status(400).json({
        error: "Media File is required",
      });
    }
    let upload_files = files.file_encoded[0];

    if (upload_files) {
      let isFileValidSize = validateMediaSize(
        upload_files.size,
        upload_files.mimetype
      );
      if (!isFileValidSize) {
        return res.status(400).json({
          error: `Media File size should be less than ${mediaLimits(
            upload_files.mimetype
          )}`,
        });
      }
    }

    const form = new FormData();
    form.append("file", upload_files.filepath, {
      filename: upload_files.originalFilename,
      contentType: upload_files.mimetype,
    });
    form.append("type", upload_files.mimetype);
    form.append("messaging_product", "whatsapp");

    const response = await axios
      .post(
        `https://graph.facebook.com/${process.env.VERSION}/${process.env.PHONE_NUMBER_ID}/media`,
        form,
        {
          headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            ...form.getHeaders(), // Include the necessary headers for form data
          },
        }
      )
      .then((response) => {
        // Handle the response here
        console.log("Response:", response.data);
        // console.log(response);
      })
      .catch((error) => {
        // Handle any errors here
        console.error("Error:", error);
      });
  });
};

getMediaDetail = async (req, res) => {
  // params: { id: 'b5ef99e8c2abc1ffb538eb38253f38f0' },
  // query: { mime_type_type: 'video', mime_type_subtype: 'mp4' },
  let media_encrypt_id = req.params.id;
  let media_type = req.query.mime_type_type;
  let media_mime_type_subtype = req.query.mime_type_subtype;
  let mediaId = cryptoHelper.decryptData(media_encrypt_id);

  const response = await axios
    .get(`https://graph.facebook.com/${process.env.VERSION}/${mediaId}`, {
      headers: {
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    })
    .then((response) => {
      // Handle the response here
      // console.log("Get Media Response:", response.data);
      let media = response.data;
      let media_mime_type = response.data.mime_type;
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: media.url,
        headers: {
          Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
        },
      };

      axios
        .request(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data));
          let filePath = response.data;
          fs.readFile(filePath, (err, data) => {
            if (err) {
              res.writeHead(404, { "Content-Type": "text/plain" });
              res.end("File not found");
            } else {
              res.writeHead(200, { "Content-Type": media_mime_type });
              res.end(data);
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });

      // console.log(response);
    })
    .catch((error) => {
      // Handle any errors here
      console.error("Error:", error);
    });
};
/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = {
  getAllMediaDetails,
  uploadAndSendMedia,
  getMediaDetail,
};
