const router = require("./index")
const Questions = require("../models/Questions");
const { questions, answers } = require("../utils/stackExchange");

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
                            val.answers.push(v);
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
  
  router.get("/v1/getQuestionDetails/:qid", async (req, res) => {
    const {qid} = req.params;
    if(!qid || qid <=0) {
      return res.json({ success: false, data: null,mgs : "Invalid QuestionId" });
    }
  
    Questions.findOne({_id : qid}, (err, data) => {
      if (err) return res.json({ success: false, error: err });
      if(!data) {
          //check if data is present or not and populate if not avaialble from the 
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
                            val.answers.push(v);
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
  
  //get list of featured questions
  router.get("/v1/getFeaturedQuestions",(req, res) => {
    //get time
    let curTime = parseInt(new Date().getTime()/1000);
    Questions.find({ bounty_amount : { $gt : 0},bounty_closes_date : {$gt : curTime}}, (err, data) => {
      if (err) return res.json({ success: false, error: err });
      if(!data || data.length <= 0) {
          //check if data is present or not and paopulate if not avaialble from the 
          //stackexchange api
          let options  = {
              "order": "desc",
              "sort": "activity",
              "site": "stackoverflow",
          }
          questions.featured_questions(options , (response) => {
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
                            val.answers.push(v);
                          })
                        }
                        let que = new Questions(val);
                        que.save()
                        .then(doc => {
                            console.log("Featured Question Saved Successfully");
                            return true;
                        })
                        .catch(err => {
                            console.log("Featured Question failed to save", err);
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
  
  
  router.get("/v1/getRelatedQuestions/:qid",(req, res) => {
    const {qid} = req.params;
    if(!qid || qid <=0) {
      return res.json({ success: false, data: null,mgs : "Invalid QuestionId" });
    }
    let options  = {
      "order": "desc",
      "sort": "activity",
      "site": "stackoverflow",
    }
    questions.related_questions(qid,options , (response) => {
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
                      val.answers.push(v);
                    })
                  }
                  let que = new Questions(val);
                  que.save()
                  .then(doc => {
                      console.log("Featured Question Saved Successfully");
                      return true;
                  })
                  .catch(err => {
                      console.log("Featured Question failed to save", err);
                      return false;
                  })
              });
            });
        }
        return res.json({ success: true, data: response });
    });
  });
  