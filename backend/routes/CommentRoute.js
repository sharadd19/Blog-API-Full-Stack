var express = require("express");
var router = express.Router();
const CommentController = require("../controllers/CommentController");
const { isAuth, checkJWT } = require("../utils/authHelper");

router.post("/", checkJWT, CommentController.createComment)

router.put("/:id", isAuth, CommentController.updateComment)

router.delete("/:id", isAuth, CommentController.deleteComment) 

module.exports = router;
