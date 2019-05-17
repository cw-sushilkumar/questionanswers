const mongoose = require("mongoose");
const express = require("express");
var cors = require('cors');
const bodyParser = require("body-parser");
const logger = require("morgan");
const Questions = require("./models/Questions");
const { questions, answers } = require("./utils/stackExchange");


const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute = "mongodb://127.0.0.1:27017/qa";

// connects our back end code with the database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

router.get("/v1", (req, res) => {
    return res.json({ success: true, data: "API is running" });
});

//get list of questions recent ones top 10 questions for the page 
router.get("/v1/getRecentQuestions",(req, res) => {
  Questions.find({}, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    if(!data || data.length <= 0) {
        //check if data is present or not and paopulate if not avaialble from the 
        //stackexchange api
        let options  = {
            "order": "desc",
            "sort": "activity",
            "site": "stackoverflow",
        }
        questions.questions(options , (response) => {
            if(response) {
                response = JSON.parse(response);
                response.items.forEach((val) => {
                    val._id = val.question_id;
                    val.owner._id = val.owner.user_id;
                    questions.answers_on_questions(val.question_id, {} , (resp) => { 
                      //get all answerIds
                      let re = JSON.parse(resp);
                      val.answers = [];
                      if(re && re.items && re.items.length > 0) {
                        re.items.forEach((v) => {
                          val.answers.push(v.answer_id);
                        })
                      }
                      let que = new Questions(val);
                      que.save()
                      .then(doc => {
                          console.log("Question Saved Successfully");
                          return true;
                      })
                      .catch(err => {
                          console.log("Question failed to save", err);
                          return false;
                      })
                   });
                });
            }
            return res.json({ success: true, data: response });
        });
    } else {
        return res.json({ success: true, data: data });
    }
  });
});

// this is our update method
// this method overwrites existing data in our database
router.post("/v1/getQuestionDetails/:qid", (req, res) => {
  const {qid} = req.params;
  if(!qid || qid <=0) {
    return res.json({ success: false, data: null,mgs : "Invalid QuestionId" });
  }

  Questions.findOne({_id : qid}, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    if(!data) {
        //check if data is present or not and paopulate if not avaialble from the 
        //stackexchange api
        questions.questions_by_ids(qid.toString(),{} , (response) => {
            if(response) {
                response = JSON.parse(response);
                response.items.forEach((val) => {
                    val._id = val.question_id;
                    val.owner._id = val.owner.user_id;
                    questions.answers_on_questions(val.question_id, {} , (resp) => { 
                      //get all answerIds
                      let re = JSON.parse(resp);
                      val.answers = [];
                      if(re && re.items && re.items.length > 0) {
                        re.items.forEach((v) => {
                          val.answers.push(v.answer_id);
                        })
                      }
                      let que = new Questions(val);
                      que.save()
                      .then(doc => {
                          console.log("Question Saved Successfully");
                          return true;
                      })
                      .catch(err => {
                          console.log("Question failed to save", err);
                          return false;
                      })
                   })
                });
            }
            return res.json({ success: true, data: response });
        });
    } else {
        return res.json({ success: true, data: data });
    }
  });
});

//get list of answer details
router.post("/v1/getAnswersByIds/", (req, res) => {
  const {aids} = req.body;
  if(!aids || aids.length <=0) {
    return res.json({ success: false, data: null,mgs : "Invalid QuestionId" });
  }

  // answers.answers_by_ids(aids, {}, (response) => {
  //   if()
  // });

  Answers.find({ _id : aid}, (err, data) => {
    if (err) return res.json({ success: false, error: err });
    if(!data || data.length <= 0) {
        //check if data is present or not and paopulate if not avaialble from the 
        //stackexchange api
        let options  = {
            "order": "desc",
            "sort": "activity",
            "site": "stackoverflow",
        }
        questions.questions(options , (response) => {
            if(response) {
                response = JSON.parse(response);
                response.items.forEach((val) => {
                    val._id = val.question_id;
                    val.owner._id = val.owner.user_id;
                    questions.answers_on_questions(val.question_id, {} , (resp) => { 
                      //get all answerIds
                      let re = JSON.parse(resp);
                      val.answers = [];
                      if(re && re.items && re.items.length > 0) {
                        re.items.forEach((v) => {
                          val.answers.push(v.answer_id);
                        })
                      }
                      let que = new Questions(val);
                      que.save()
                      .then(doc => {
                          console.log("Question Saved Successfully");
                          return true;
                      })
                      .catch(err => {
                          console.log("Question failed to save", err);
                          return false;
                      })
                   });
                });
            }
            return res.json({ success: true, data: response });
        });
    } else {
        return res.json({ success: true, data: data });
    }
  });
});

// append /api for our http requests
app.use("/api", router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));