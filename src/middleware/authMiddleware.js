/**
 * Authentication Middleware
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 8, 2023
 * Description: Middleware functions for authenticating and authorizing user requests.
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
const currentUser = require("../utils/currentUserUtils");
const HttpException = require("../utils/HttpExceptionUtils");
const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const auth = (...roles) => {
  return async function (req, res, next) {
    try {
      const authHeader = req.headers.authorization;
      const bearer = "Token ";

      if (!authHeader || !authHeader.startsWith(bearer)) {
        throw new HttpException(401, "Access denied. No credentials sent!");
      }

      const token = authHeader.replace(bearer, "");
      const secretKey = process.env.SECRET_JWT || "";

      // Verify Token
      const decoded = jwt.verify(token, secretKey);
      const user = await UserModel.findOne({ id: decoded.user_id });

      if (!user) {
        throw new HttpException(401, "Authentication failed!");
      }

      const ownerAuthorized = true;
      // check if the current user is the owner user
      if (req.params.id) {
        ownerAuthorized = req.params.id == user.id;
      }

      // if the current user is not the owner and
      // if the user role don't have the permission to do this action.
      // the user will get this error
      if (!ownerAuthorized && roles.length && !roles.includes(user.role)) {
        throw new HttpException(401, "Unauthorized");
      }

      // If the user has the necessary permissions, set the currentUser
      currentUser.setCurrentUser(user);

      // if the user has permissions
      req.currentUser = user;
      next();
    } catch (e) {
      e.status = 401;
      next(e);
    }
  };
};

module.exports = auth;
