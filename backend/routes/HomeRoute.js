var express = require("express");
var router = express.Router();
const HomeController = require("../controllers/HomeController");
const isAuth = require("../utils/authHelper").isAuth;
const checkJWT = require("../utils/authHelper").checkJWT;
/* GET home page. */
router.get("/home", checkJWT, HomeController.home);

router.post("/signup", HomeController.signUp);

router.post("/login", HomeController.login);

router.post("/logout", isAuth, HomeController.logout) 

module.exports = router;