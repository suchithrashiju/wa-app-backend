/**
 * User Controller
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 8, 2023
 * Description: Handles user registration, login, and retrieval of user details.
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
const userModel = require("../models/userModel");
const userService = require("../services/userService");
const commonHelper = require("../helpers/commonHelper");
const HttpException = require("../utils/HttpExceptionUtils");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
//user login
userLogin = async (req, res, next) => {
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

  const { password, ...userWithoutPassword } = user;

  res.send({ ...userWithoutPassword, token });
};

//get all users
getAllUsers = async (req, res) => {
  try {
    const limit = req.query.limit; // Access the 'limit' parameter from the query string
    let reqParams = {
      limit: req.query.limit || null,
      protocol: req.protocol || null,
      baseUrl: req.baseUrl || null,
      host: req.get("host") || null,
    };
    const users = await userService.getAllUserResults(reqParams);
    // if (users.length == 0) {
    //   throw new HttpException(404, "Users not found");
    // }
    res.send(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);

    res
      .status(error.status || 500)
      .send({ status: "FAILED", data: { error: error.message || error } });
  }
};

//get current user
getCurrentUser = async (req, res, next) => {
  try {
    let reqParams = {
      protocol: req.protocol || null,
      baseUrl: req.baseUrl || null,
      host: req.get("host") || null,
    };
    const currentUserData = await userService.getCurrentUserData(reqParams);
    if (currentUserData.length == 0) {
      throw new HttpException(404, "User not found");
    }
    res.send(currentUserData);
  } catch (error) {
    console.error("Error fetching current user details:", error.message);
    res
      .status(error.status || 500)
      .send({ status: "FAILED", data: { error: error.message || error } });
  }
};

//update new password
changePassword = async (req, res) => {
  try {
    let reqParams = {
      current_password: req.body.current_password || null,
      password: req.body.new_password || null,
    };

    const resultData = await userService.updatePassword(reqParams);

    res.send(resultData);
  } catch (error) {
    console.error("Error change password:", error.message);
    res.status(error.status || 500).send({
      status: "FAILED",
      data: {
        error: error.message || error,
      },
    });
  }
};

getUserById = async (req, res, next) => {
  const user = await UserModel.findOne({ id: req.params.id });
  if (!user) {
    throw new HttpException(404, "User not found");
  }

  const { password, ...userWithoutPassword } = user;

  res.send(userWithoutPassword);
};

getUserByuserName = async (req, res, next) => {
  const user = await UserModel.findOne({ username: req.params.username });
  if (!user) {
    throw new HttpException(404, "User not found");
  }

  const { password, ...userWithoutPassword } = user;

  res.send(userWithoutPassword);
};

createUser = async (req, res, next) => {
  commonHelper.checkValidation(req);

  await commonHelper.hashPassword(req);

  const result = await UserModel.create(req.body);

  if (!result) {
    throw new HttpException(500, "Something went wrong");
  }

  res.status(201).send("User was created!");
};

updateUser = async (req, res, next) => {
  commonHelper.checkValidation(req);

  await commonHelper.hashPassword(req);

  const { confirm_password, ...restOfUpdates } = req.body;

  // do the update query and get the result
  // it can be partial edit
  const result = await UserModel.update(restOfUpdates, req.params.id);

  if (!result) {
    throw new HttpException(404, "Something went wrong");
  }

  const { affectedRows, changedRows, info } = result;

  const message = !affectedRows
    ? "User not found"
    : affectedRows && changedRows
    ? "User updated successfully"
    : "Updated failed";

  res.send({ message, info });
};

deleteUser = async (req, res, next) => {
  const result = await UserModel.delete(req.params.id);
  if (!result) {
    throw new HttpException(404, "User not found");
  }
  res.send("User has been deleted");
};

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = {
  userLogin,
  getAllUsers,
  getCurrentUser,
  changePassword,
};
