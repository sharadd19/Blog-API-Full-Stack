const asyncHandler = require("express-async-handler");
const PostModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");

//Get admin form and pass in user information to get the isAdmin property
exports.getAdmin = asyncHandler(async (req, res) => {
  const { isAdmin } = await UserModel.findOne(
    { _id: req.user.id },
    "isAdmin"
  ).exec();

  return res.json({ success: true, isAdmin: isAdmin });
});

//Post admin form to post the secret value and check if it is what we have in .env
exports.admin = asyncHandler(async (req, res) => {
  const secret = req.body.secret;

  if (secret === process.env.ADMIN_SECRET) {
    await UserModel.findByIdAndUpdate(req.user.id, { isAdmin: true });

    return res.json({ success: true, redirectTo: "/api/user/home" });
  } else {
    return res.status(400).json({
      success: false,
      error: { val: true, message: "Sorry, you entered the wrong secret" },
      redirectTo: "/api/user/admin",
    });
  }
});
