const UserModel = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const PostModel = require("../models/PostModel");
const CommentModel = require("../models/CommentModel");
const { issueJWT } = require("../utils/jwtHelper");
const { hashPassword, isValidPassword } = require("../utils/passwordHelper");
const { body, validationResult } = require("express-validator");

// Get all the posts with the author and comment data
exports.home = asyncHandler(async (req, res) => {
  const postList = await PostModel.find()
    .sort({ date: -1 })
    .populate("author")
    .populate({
      path: 'comment',
      options: { sort: { date: -1 } }
    })
    .exec();

  return res.json({
    success: true,
    postList: postList,
    user: req.user ? req.user : null,
  });
});

exports.signUp = [
  body("username", "Username must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("password", "Password must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("confirmPassword", "Passwords must match")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("The passwords do not match"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const user = await UserModel.findOne({
      username: req.body.username,
    }).exec();

    if (user) {
      return res.json({
        success: false,
        message: "Username exists, try another one",
        redirectTo: "/api/signup",
      });
    }
    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.
      return res.status(301).json({
        sucess: false,
        errors: errors.array(),
        title: "Create an account!",
        redirectTo: "/api/signup",
      });
    } else {
      const hashedPassword = await Promise.resolve(
        hashPassword(req.body.password)
      );

      const userDetails = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: hashedPassword,
        isAdmin: false,
      };
      const user = new UserModel(userDetails);
      await user.save();
      const userJWT = issueJWT(user);
      return res.json({
        success: true,
        message: "User created!",
        user: user,
        token: userJWT.token,
        expires: userJWT.expires,
        redirectTo: "/api/home",
      });
    }
  }),
];

exports.login = asyncHandler(async (req, res) => {
  const user = await UserModel.findOne({ username: req.body.username }).exec();
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User doesn't exist",
      redirectTo: "/api/login",
    });
  }
  const isValid = await Promise.resolve(
    isValidPassword(req.body.password, user.password)
  );
  if (isValid) {
    const userJWT = issueJWT(user);
    return res.status(200).json({
      success: true,
      message: "User logged in!!",
      token: userJWT.token,
      expires: userJWT.expires
      });
  } else {
    res
      .status(401)
      .json({
        success: false,
        message: "You entered the wrong password",
        redirectTo: "/api/login",
      });
  }
});

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.json({ success: false, message: "Error logging out!" });
      //return next(err);
    } else {
      return res.status(200).json({
        success: true,
        message: "You have logged out!",
      });
    }
  });
};
