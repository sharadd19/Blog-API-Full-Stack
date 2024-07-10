const asyncHandler = require("express-async-handler");
const PostModel = require("../models/PostModel");
const UserModel = require("../models/UserModel");
const CommentModel = require("../models/CommentModel");
const { body, validationResult } = require("express-validator");

//TODO: do we want to hide the author of posts and comments if no req.user
exports.getPost = asyncHandler(async (req, res) => {
  const post = await PostModel.findById(req.params.id)
    .populate("author")
    .populate({
      path: "comment",
      options: { sort: { date: -1 } },
    })
    .exec();

  return res.json({
    success: true,
    post: post,
  });
});

exports.createPost = [
  body("title", "Title must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
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

    const post = new PostModel({
      title: req.body.title,
      description: req.body.description,
      date: Date.now(),
      author: req.user,
    });

    if (!errors.isEmpty()) {
      return res.json({
        success: false,
        errors: errors.array(),
        post: post,
        redirectTo: "/post/create",
      });
    } else {
      post.save();
      return res.status(201).json({
        success: true,
        message: "Post created!",
        post: post,
        redirectTo: "/api/home",
      });
    }
  }),
];

exports.deletePost = asyncHandler(async (req, res) => {
  // First, find the post
  const post = await PostModel.findById(req.params.id)
    .populate("author")
    .populate({
      path: "comment",
      options: { sort: { date: -1 } },
    })
    .exec();

  
  const user = req.user; //There will always be a user if we are here since this is an protected route
  // Check if the post exists
  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
      redirectTo: "/api/home",
    });
  }

  // Get the id's of all the comments to delete from the post
  const commentsToDelete = post.comment.map((c) => c._id);

  if (user.isAdmin) {
    // If we've made it here, the user is authorized to delete the post
    await PostModel.deleteOne({ _id: req.params.id });
    // Delete all the comments associated with this post
    await CommentModel.deleteMany({ _id: { $in: commentsToDelete } });

    return res.status(200).json({
      success: true,
      message: "Post with comments deleted successfully",
      redirectTo: "/api/home",
    });
  }
  // Check if the current user is the owner of the post
  // Assuming req.user.id contains the ID of the authenticated user
  if (post.author._id.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to delete this post",
      redirectTo: post.url + "/delete",
    });
  } else {
    // If we've made it here, the user is authorized to delete the post
    await PostModel.deleteOne({ _id: req.params.id });
    // Delete all the comments associated with this post
    await CommentModel.deleteMany({ _id: { $in: commentsToDelete } });

    return res.status(200).json({
      success: true,
      message: "Post with comments deleted successfully",
      redirectTo: "/api/home",
    });
  }
});

exports.updatePost = [
  body("title", "Title must contain at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
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

    const post = await PostModel.findById(req.params.id)
      .populate("author")
      .populate({
        path: "comment",
        options: { sort: { date: -1 } },
      })
      .exec();

    // Get all the comments associated with this post so that they remain when we update
    const comments = post.comment;

    // Check if the post exists
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
        redirectTo: post.url + "/update",
      });
    }

    // Check if the current user is the owner of the post
    // Assuming req.user.id contains the ID of the authenticated user
    if (post.author._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this post",
        redirectTo: post.url + "/update",
      });
    }

    const postDetails = {
      title: req.body.title,
      description: req.body.description,
      date: Date.now(),
      author: req.user,
      comment: comments,
    };

    const postToUpdate = new PostModel(postDetails);

    if (!errors.isEmpty()) {
      return res.json({
        success: false,
        errors: errors.array(),
        post: postToUpdate,
        redirectTo: post.url + "/update",
      });
    } else {
      postToUpdate._id = req.params.id;
      await PostModel.findByIdAndUpdate(req.params.id, postToUpdate);
      return res.status(201).json({
        success: true,
        message: "Post updated!",
        post: postToUpdate,
        redirectTo: post.url,
      });
    }
  }),
];
