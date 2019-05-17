const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const UserSchema = new Schema(
  {
    _id: Number,
    message: String,
    reputation: Number,
    user_type: String,
    profile_image: String,
    display_name: String,
    link: String
  },
  { timestamps: true }
);

module.exports = UserSchema;