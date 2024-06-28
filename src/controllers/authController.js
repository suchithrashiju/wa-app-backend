/**
 * Auth Controller
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 8, 2023
 * Description: Handles user authentication, token generation by login, and logout.
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
const userService = require("../services/userService");
const commonHelper = require("../helpers/commonHelper");
const HttpException = require("../utils/HttpExceptionUtils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              Auth Controller
 ******************************************************************************/

//generate token
getAuthToken = async (req, res, next) => {
  commonHelper.checkValidation(req);

  const { email, password: pass } = req.body;

  const user = await userService.getOneUser({ email });

  if (!user) {
    throw new HttpException(
      401,
      "Login failed. Please check your credentials!"
    );
  }

  const isMatch = await bcrypt.compare(pass, user.password);

  if (!isMatch) {
    throw new HttpException(401, "Invalid password!");
  }

  // user matched!
  const secretKey = process.env.SECRET_JWT || "";
  const token = jwt.sign({ user_id: user.id.toString() }, secretKey, {
    expiresIn: "24h",
  });

  res.send({ token: token });
};

//user logout and  delete token
getLogout = (req, res, next) => {
  const authHeader = req.headers.authorization;
  jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
    if (logout) {
      res.send({ message: "You have been Logged Out" });
    } else {
      console.error("Error in Logout :", error.message);

      res.send({ message: "Error" });
    }
  });
};

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = {
  getAuthToken,
};
