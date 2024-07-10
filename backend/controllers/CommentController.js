const asyncHandler = require("express-async-handler");
const PostModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");
const CommentModel = require("../models/CommentModel");
const { body, validationResult } = require("express-validator");

exports.createComment = [
  body("description", "Description must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .custom((value) => {
      return value.length < 200;
    })
    .withMessage("Comment over character limit"),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const post = await PostModel.findById(req.body.postid)
      .populate("author")
      .populate({
        path: "comment",
        options: { sort: { date: -1 } },
      })
      .exec();

    const comment = new CommentModel({
      description: req.body.description,
      date: Date.now(),
      author: req.user ? req.user : null,
    });

    if (!errors.isEmpty()) {
      return res.json({
        success: false,
        errors: errors.array(),
        comment: comment,
        post: post,
        redirectTo: post.url,
      });
    } else {
      comment.save();
      post.comment.unshift(comment); //Adds the comment to the start of the list
      post.save();
      return res.status(201).json({
        success: true,
        message: "Comment created!",
        comment: comment,
        post: post,
        redirectTo: post.url,
      });
    }
  }),
];

exports.deleteComment = asyncHandler(async (req, res) => {
  // First, find the post and the comment
  const [post, comment] = await Promise.all([
    PostModel.findById(req.body.postid)
      .populate("author")
      .populate({
        path: "comment",
        options: { sort: { date: -1 } },
      })
      .exec(),

    CommentModel.findById(req.params.id).populate("author").exec(),
  ]);

  const user = req.user; //There will always be a user if we are here since this is an protected route

  // Check if the comment exists
  if (!comment) {
    return res.status(404).json({
      success: false,
      message: "Comment not found",
      //redirectTo: post.url,
    });
  }

  if (user.isAdmin) {
    await CommentModel.deleteOne({ _id: req.params.id });

    return res.status(200).json({ 
      success: true,
      message: "Comment deleted successfully",
      //redirectTo: post.url,
    });
  }

  // Check if the current user is the owner of the comment OR
  // Check wer're not trying to delete a public comment
  // Assuming req.user.id contains the ID of the authenticated user
  if (!comment.author || comment.author._id.toString() !== user.id) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to delete this comment",
      //redirectTo: post.url,
    });
  }
  // If we've made it here, the user is authorized to delete the comment
  else {
    await CommentModel.deleteOne({ _id: req.params.id });

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
      //redirectTo: post.url,
    });
  }
});

exports.updateComment = [
  body("description", "Description must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape()
    .custom((value) => {
      return value.length < 200;
    })
    .withMessage("Comment over character limit"),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    // First, find the post and the comment
    const [post, comment] = await Promise.all([
      PostModel.findById(req.body.postid)
        .populate("author")
        .populate({
          path: "comment",
          options: { sort: { date: -1 } },
        })
        .exec(),

      CommentModel.findById(req.params.id).populate("author").exec(),
    ]);
    // Check if the post exists
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
        //redirectTo: post.url + "/update",
      });
    }

    // Check if the current user is the owner of the comment OR
    // Check wer're not trying to update a public comment
    // Assuming req.user.id contains the ID of the authenticated user
    if (!comment.author || comment.author._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this comment",
        //redirectTo: post.url,
      });
    }

    const commentToUpdate = new CommentModel({
      description: req.body.description,
      date: Date.now(),
      author: req.user,
    });

    if (!errors.isEmpty()) {
      return res.json({
        success: false,
        errors: errors.array(),
        comment: commentToUpdate,
        //redirectTo: post.url + "/update",
      });
    } else {
      commentToUpdate._id = req.params.id;
      await CommentModel.findByIdAndUpdate(req.params.id, commentToUpdate);
      return res.status(201).json({
        success: true,
        message: "Comment updated!",
        comment: commentToUpdate,
        //redirectTo: post.url,
      });
    }
  }),
];
