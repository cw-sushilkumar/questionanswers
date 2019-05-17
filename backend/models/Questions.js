const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User  = require('./User');
const Tag  = require('./Tags')

const QuestionSchema = new Schema(
  {
    _id: Number, //question_id
    title: String,
    body: String,
    tags : [],
    owner : [User],
    accepted_answer_id : Number,
    is_answered: Boolean,
    view_count: Number,
    answer_count: Number,
    score: Number,
    favorite_count: Number,
    down_vote_count: Number,
    up_vote_count: Number,
    last_activity_date: Number,
    creation_date: Number,
    link: String,
    last_edit_date: Number,
    answers : [],
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Questions", QuestionSchema);