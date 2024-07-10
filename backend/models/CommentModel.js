
const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  description: { type: String, required: true, maxLength: 200 },
  date: {type: Date, required: true},
  author: {type: Schema.Types.ObjectId, ref: "User"},
});

// Virtual for comment's URL
CommentSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/comment/${this._id}`;
});

// Virtual for comment's formatted date
CommentSchema.virtual("date_formatted").get(function () {
    return this.date
    ? DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED)
    : "";
  });

// Export model
module.exports = mongoose.model("Comment", CommentSchema);