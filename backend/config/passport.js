require("dotenv").config();
const passport = require("passport");
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const UserModel = require("../models/UserModel");

var options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const strategy = new JwtStrategy(options, async (payload, done) => {
  try {
    const user = await UserModel.findOne({ _id: payload.sub });
    if (!user) {
      return done(null, false, { message: "User does not exist" });
    }
    else {
      return done(null, user)
    }
  } catch (error) {
    return done(error, null);
  }
});

passport.use(strategy);
