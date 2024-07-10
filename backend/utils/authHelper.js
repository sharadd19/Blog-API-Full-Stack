require("dotenv").config();
const passport = require("passport");
const jwt = require("jsonwebtoken");

exports.checkJWT = (req, res, next) => {
  // Check to see if there is a token, if there is then remove the bearer part of it
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (token) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user.user;
    } catch (error) {
      // Invalid token, but we'll still allow the request to proceed
    }
  }

  next();
};

exports.isAuth = (req, res, next) => {
  passport.authenticate("jwt", { session: false })(req, res, next); // This passes (req, res, next) to the Passport middleware
};

//passport.authenticate() returns a middleware function*. And all middleware function NEED (req,res,next) as parameters
// *this middleware function is the jwt strategy which extracts the payload from the token
// The token comes from the request so if there is no (req,res,next) then there will be no request to extract the token from
// This is all done from behind the scenes
// Once the middlware function runs it calls done(null,user) if we pass authentication
// that then passses into our (err, user) callback where we handle our errors
// When we wrap the authenticate method in another function, we're not calling the authenticate method
// We're calling the isAuth function which returns a middleware function so we need to call the middleware function
// To call the middleware function, we use the parameters
// When we use it in the route, it is automatically called
// const authenticateJWT = (req, res, next) => {
//     // You're telling the security guard (Passport) how to handle different scenarios
//     passport.authenticate('jwt', { session: false }, (err, user, info) => {
//       if (err) {
//         return next(err);  // If there's an error, tell the next person in charge
//       }
//       if (!user) {
//         return res.status(401).json({ message: "Unauthorized" });  // If no valid ID, deny entry
//       }
//       req.user = user;  // If ID is valid, give the person a visitor badge (attach user info)
//       next();  // Let them enter the building (continue to the next middleware)
//     })(req, res, next);  // Actively put this guard at the entrance (execute the middleware)
//   };
