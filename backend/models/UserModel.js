
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: { type: String, required: true, maxLength: 100 },
  lastName: { type: String, required: true, maxLength: 100 },
  username: {type: String, required: true},
  password: {type: String, required: true},
  isAdmin: {type: Boolean, required: true},
},
{
  toJSON: { virtuals: true }, //ensures virtual properties are included when converting to json
  toObject: { virtuals: true },
});

// Virtual for user's URL
UserSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/user/${this._id}`;
});

// Export model
module.exports = mongoose.model("User", UserSchema);