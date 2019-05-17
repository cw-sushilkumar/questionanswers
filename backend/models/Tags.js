const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//not needed as such 
const TagsSchema = new Schema(
  {
    id: Number,
    Name: String,
  },
  { timestamps: true }
);

module.exports = TagsSchema;