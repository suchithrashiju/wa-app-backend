/**
 * User Validator Middleware
 * Company Name: Ginger Technologies
 * Author: Suchithra.S
 * Created Date: July 8, 2023
 * Description: Middleware functions for validating user input and request data related to user operations.
 *
 * Last Updated:
 *
 * Changes:
 *
 * Date:
 * Functions:
 * - Changed Function Names
 *
 * Changes Made:
 * - Changes
 */

// Import necessary dependencies and models
const { check } =
  process.env.NODE_RUN_ENV === "online"
    ? require("express-validator/check")
    : require("express-validator");
const Role = require("../../utils/userRolesUtils");

exports.createUserSchema = [
  check("username")
    .exists()
    .withMessage("username is required")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 chars long"),
  check("first_name")
    .exists()
    .withMessage("Your first name is required")
    .isAlpha()
    .withMessage("Must be only alphabetical chars")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 chars long"),
  check("last_name")
    .exists()
    .withMessage("Your last name is required")
    .isAlpha()
    .withMessage("Must be only alphabetical chars")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 chars long"),
  check("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),
  check("role")
    .optional()
    .isIn([Role.Admin, Role.SuperUser])
    .withMessage("Invalid Role type"),
  check("password")
    .exists()
    .withMessage("Password is required")
    .isLength({ min: 6, max: 10 })
    .withMessage("Password must be 6 to 10 characters long")
    .custom((value, { req }) => !!req.body.confirm_password)
    .withMessage("Please confirm your password"),
  check("confirm_password")
    .exists()
    .custom((value, { req }) => value === req.body.password)
    .withMessage(
      "confirm_password field must have the same value as the password field"
    ),
  check("age").optional().isNumeric().withMessage("Must be a number"),
];

exports.updateUserSchema = [
  check("username")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 chars long"),
  check("first_name")
    .optional()
    .isAlpha()
    .withMessage("Must be only alphabetical chars")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 chars long"),
  check("last_name")
    .optional()
    .isAlpha()
    .withMessage("Must be only alphabetical chars")
    .isLength({ min: 3 })
    .withMessage("Must be at least 3 chars long"),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),
  check("role")
    .optional()
    .isIn([Role.Admin, Role.SuperUser])
    .withMessage("Invalid Role type"),
  check("password")
    .optional()
    .isLength({ min: 6, max: 10 })
    .withMessage("Password must be 6 to 10 characters long")
    .custom((value, { req }) => !!req.body.confirm_password)
    .withMessage("Please confirm your password"),
  check("confirm_password")
    .optional()
    .custom((value, { req }) => value === req.body.password)
    .withMessage(
      "confirm_password field must have the same value as the password field"
    ),
  check("age").optional().isNumeric().withMessage("Must be a number"),
  check()
    .custom((value) => {
      return !!Object.keys(value).length;
    })
    .withMessage("Please provide the required field to update")
    .custom((value) => {
      const updates = Object.keys(value);
      const allowUpdates = [
        "username",
        "password",
        "confirm_password",
        "email",
        "role",
        "first_name",
        "last_name",
        "age",
      ];
      return updates.every((update) => allowUpdates.includes(update));
    })
    .withMessage("Invalid updates!"),
];

exports.validateLogin = [
  check("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email")
    .normalizeEmail(),
  check("password")
    .exists()
    .withMessage("Password is required")
    .isEmpty()
    .withMessage("Password must be filled"),
];
