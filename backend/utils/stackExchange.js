const stackexchange  = require("stack-exchange")({ version : "2.2" });

const stack_users = stackexchange.users;
const stack_questions = stackexchange.questions; //for questions sections endpoints
const stack_answers = stackexchange.answers; //for answers sections endpoints
const stack_badges = stackexchange.badges; //for badges sections endpoints
const stack_tags = stackexchange.tags; //for tags sections endpoints
const stack_comments = stackexchange.comments;//for comments sections endpoi

module.exports = {
    users : stack_users,
    answers : stack_answers,
    questions : stack_questions,
    badges : stack_badges,
    tags : stack_tags,
    comments : stack_comments
}