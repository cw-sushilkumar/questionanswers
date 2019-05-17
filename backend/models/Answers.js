const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const AnswerSchema = new Schema(
  {
    id: Number,
    Name: String,
  },
  { timestamps: true }
);

module.exports = AnswerSchema;