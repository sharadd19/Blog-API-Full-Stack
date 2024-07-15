require("dotenv").config();
require("./config/mongoDBConfig");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const HomeRouter = require("./routes/HomeRoute");
const UserRouter = require("./routes/UserRoute");
const PostRouter = require("./routes/PostRoute");
const CommentRouter = require("./routes/CommentRoute");
const cors = require("cors");
const passport = require("passport");
const { error } = require("console");

const app = express();

/* --------------------------DATABASE------------------------------- */
/* 
var mongoose = require("mongoose");
mongoose.set("strictQuery", false);


main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
} */

/* -------------------------MIDDLEWARE----------------------------- */
app.set('trust proxy', 1)


// SESSION
var session = require("express-session");
var MongoStore = require("connect-mongo");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
      dbName: "sessions",
      ttl: 60 * 60, // session expires after 1h
    }),
    cookie: { secure: true, sameSite: 'none'}
  })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors(
  /* {
  origin: 'http://localhost:5173'  // Your frontend URL - allows us to access the api from this port and share resources between frontend and backend
} */));
// AUTHENTICATION
require("./config/passportConfig")
app.use(passport.initialize())


/* ------------------ROUTES------------------------------------ */

app.use("/api", HomeRouter);
app.use("/api/user", UserRouter);
app.use("/api/post", PostRouter); 
app.use("/api/comment", CommentRouter) 

/* --------------------ERROR HANDLING----------------------------- */

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;