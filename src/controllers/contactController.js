/**
 * Contact Controller
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 11, 2023
 * Description: Handles contact-related operations
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
const contactService = require("../services/contactService");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              Contact Controller
 *****************************************************************************/

// get all contacts
getAllContacts = async (req, res) => {
  try {
    let reqParams = {
      limit: req.query.limit || null,
      search: req.query.search || null,
      pages: req.query.pages || null,
      original_url: req.originalUrl || null,
    };
    const contacts = await contactService.getAllContactResults(reqParams);
    // if (contacts.count == 0) {
    //   throw new HttpException(404, "Contacts not found");
    // }
    res.send(contacts);
  } catch (error) {
    res.status(error.status || 500).send({
      status: "FAILED",
      data: error.message || error,
    });
  }
};
getAllContactsByWaId = async (req, res) => {
  try {
    let reqParams = {
      wa_id: req.params.waId,
      limit: req.query.limit || null,
      search: req.query.search || null,
      pages: req.query.pages || null,
      original_url: req.originalUrl || null,
    };
    const contacts = await contactService.getAllContactResultsByWAId(reqParams);

    res.send(contacts);
  } catch (error) {
    res.status(error.status || 500).send({
      status: "FAILED",
      data: error.message || error,
    });
  }
};

// Verifies given contacts
getVerifyContacts = async (req, res) => {
  try {
    const reqParams = {
      blocking: req.body.blocking,
      contacts: req.body.contacts,
      force_check: req.body.force_check,
    };
    const verifiedContacts = await contactService.verifyContacts(reqParams);
    res.send(verifiedContacts);
  } catch (error) {
    res
      .status(error.status || 500)
      .send({ status: "FAILED", data: error.message || error });
  }
};

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = {
  getAllContacts,
  getVerifyContacts,
  getAllContactsByWaId,
};
