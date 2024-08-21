var express = require("express");
var router = express.Router();
const PostController = require("../controllers/PostController");
const {isAuth, checkJWT} = require("../utils/authHelper")


router.get("/:id", checkJWT, PostController.getPost);

router.post("/", isAuth, PostController.createPost)

router.delete("/:id", isAuth, PostController.deletePost);

router.put("/:id", isAuth, PostController.updatePost)

module.exports = router;
