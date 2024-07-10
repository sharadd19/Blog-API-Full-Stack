var express = require('express');
var router = express.Router();
const UserController = require("../controllers/UserController");
const isAuth = require("../utils/authHelper").isAuth;
/* GET users listing. */

router.get('/admin', isAuth, UserController.getAdmin);

router.post('/admin', isAuth, UserController.admin);

module.exports = router;
