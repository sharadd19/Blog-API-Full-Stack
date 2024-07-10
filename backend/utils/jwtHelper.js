require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.issueJWT = (user) => {
  const _id = user.id;
  const expiresIn = "1d";
  const userToGet = user
  const payload = {
    sub: _id,
    user: userToGet,
    iat: Date.now(),
  };

  const signedToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
};
