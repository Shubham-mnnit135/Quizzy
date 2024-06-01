import Quiz from "../Models/Quiz.js";
import Question from "../Models/Question.js";
import StudentRecord from "../Models/StudentRecord.js";

export const giveQuiz = async(req, res) => {
   try {
      
      let numberOfQuestions = req?.body?.count;
      // console.log(numberOfQuestions)
      const topics = req?.body?.topics;
      
      // console.log(topics)
      const creatorID = req?.body?.userID;
      const type = "for me";
      const topicWithCount = await Question.aggregate([
         {
            $match :{
               topic :{$in :topics}
            }
         },
         {
            $group : {
               _id : "$topic",
               count : {$sum :1}
            }
         },
         {
            $sort :{count : 1}
         }
      ]);
      // console.log("topic with the count",topicWithCount);
      const totalQuestionOfRequiredTopic =topicWithCount.reduce((totalRequired,obj)=>{
            return totalRequired+=obj.count;
      },0)
      // console.log("totalQuestionOfRequiredTopic",totalQuestionOfRequiredTopic);
      let list = new Array(topics.length).fill(Math.floor(numberOfQuestions / topics.length));
      let remains = numberOfQuestions % topics.length;
      let i = list.length -1;
      while(remains--){
         list[i]++;
         i--;
      }
      // console.log("list",list);
      let questionsOfQuiz = [] ;
      if(totalQuestionOfRequiredTopic >= numberOfQuestions && topicWithCount.length === topics.length){
            let carry = 0;
            // console.log("in first if");
            for( let i=0;i<list.length ;i++){
               let size=0;
               if(topicWithCount[i].count < list[i]){
                  carry += list[i] - topicWithCount[i].count;
                  size = topicWithCount[i].count;
               }
               else if(topicWithCount[i].count > list[i]){
                  let currentRequred = list[i]+carry;
                  carry = currentRequred - topicWithCount[i].count > 0 ? currentRequred - topicWithCount[i].count : 0;
                  size = Math.min(currentRequred, topicWithCount[i].count);
               }
               else{
                  size = list[i];
               } 

               let questionsFormDb = await Question.aggregate([
               {
                  $match:{topic : topicWithCount[i]._id.toLowerCase()}
               },
               {
                  $sample:{ size :size}
               }
               ])
               // console.log("question from db",questionsFormDb);
               questionsOfQuiz=questionsOfQuiz.concat(questionsFormDb);
            }
            // console.log("question of quiz", questionsOfQuiz);
            const questionsID = questionsOfQuiz.map((obj)=>{
               return obj._id;
            })
            // console.log("questiosId" , questionsID);
            const quiz = {
               creatorID : creatorID,
               topics : topics,
               questions :questionsID,
               type: type,
            };
            // console.log("quiz",quiz);
            const temp = await Quiz.create(quiz);
            // console.log("new quiz in db",temp);         
            res.status(200).json({quizID:temp._id,questionsOfQuiz:questionsOfQuiz});
      }
      else{
         throw new Error("Enough Questions are not in the Database for each Topic");
      }
   } catch (error) {
      res.status(400).json({success : false, message : error.message});
   }
}


export const createQuiz = async(req,res)=>{
   try {
       const { userID , questions, marks, negMarks, startTime, endTime, duration} = req.body;
      //  console.log(req.body); 
      //  console.log(questions);
       if (!userID || !questions || !questions.length) {
           throw new Error("Please provide creator_id, topic, and at least one question ID.")
       }
       const existingQuestions = await Question.find({ _id: { $in: questions } });
       if (existingQuestions.length !== questions.length) {
           throw new Error('One or more questions not found.' );
       }
       const uniqueTopics = [];
       existingQuestions.forEach(question => {
         if (!uniqueTopics.includes(question.topic)) {
            uniqueTopics.push(question.topic);
         }
       });
       const newQuiz = new Quiz({
               creatorID : userID,
               topics : uniqueTopics,
               questions:questions,
               type : "for others",
               startTime,
               endTime,
               duration,
               marks,
               negMarks
       })
      //  console.log("new Quiz",newQuiz);
       const savedQuiz = await newQuiz.save();
       res.status(200).json({success:true,quizID: savedQuiz._id});
   } catch (error) {
       res.status(400).json({ success: false, message: error.message});
   }
}

export const quizResult = async(req, res) => {
   try {
       const quizID = req.body.quizID;
       const allResult = await StudentRecord.find({quizID: quizID});
       allResult.sort((obj1,obj2) =>{
          return obj2.marks - obj1.marks;
       } )
      //  console.log(allResult);
       res.status(200).json({allResult:allResult});
   } 
   catch (error) {
       res.status(400).json({message : error.message});
   }
}


export const myQuizzes = async(req, res) => {
   try {
      const myAllQuiz = await Quiz.find({creatorID: req?.body?.userID,type :"for others"});
      // console.log(myAllQuiz);
      res.status(200).json({myAllQuiz:myAllQuiz});
   } 
   catch (error) {
      res.status(400).json({success:false, message:error.message});
   }
}


export const quizById = async(req, res) =>{
   try {
      // console.log("welcome")
      const quizID = req?.body?.quizID;
      const quiz = await Quiz.findOne({_id : quizID});
      
      if(quiz){
         if(quiz?.startTime && quiz.startTime<new Date() && quiz?.endTime && quiz?.endTime <= new Date()){
            throw new Error("Quiz is not available");
         }
         else{
            // console.log("it is available");
            const questionsID = quiz?.questions;
            const questions = await Question.find({ _id : {$in:questionsID}})
            if(questions.length === questionsID.length){
               const newQuiz = {
                  quizID : quizID,
                  questions:questions,
                  duration: 0,
                  marks: 0,
                  negMarks: 0
               }
               if(quiz?.duration){
                  newQuiz.duration = quiz?.duration;
               }
               
               if(quiz?.marks){
                  newQuiz.marks = parseFloat(quiz?.marks?.toString());
               }
               if(quiz?.negMarks){
                  newQuiz.negMarks = parseFloat(quiz?.negMarks?.toString());
               }
               // console.log("new quiz",newQuiz);
               res.status(200).json({success:true,newQuiz: newQuiz});
            }
            else{
               throw new Error("Questions from this quiz have been removed");
            }
         }
      }
      else{
         throw new Error("The provided Quiz ID is invalid");
      }
      
   } catch (error) {
      res.status(400).json({success: false, message:error.message});
   }
}