const bcrypt = require("bcryptjs");

module.exports.hashPassword = (userPassword) => {
  return bcrypt.hash(userPassword, 10)
    
};

module.exports.isValidPassword = (userPassword, dbPassword) => {
  return bcrypt.compare(userPassword, dbPassword);
};