import Question from '../Models/Question.js';

export const addQuestion = async(req, res) =>{
    try {
        const quesExist =await Question.findOne({question : req?.body?.question.toLowerCase()});
        console.log("quest",quesExist);
        if(!quesExist){
            const question = {
                type: req?.body?.type,
                topic : req?.body?.topic.toLowerCase(),
                question : req?.body?.question.toLowerCase(),
                options : req?.body?.options,
                answer : req?.body?.answer,
                creatorID : req?.body?.userID 
            }
            await Question.create(question);
            res.status(200).json({message: "succussfully added"});
        }
        else{
            throw new Error("Question is already exist")
        }
    } catch (error) {
        res.status(400).json({success: false, message : error.message});
    }
}

export const getAllQuestionforPrepration = async(req, res) => {
    try {
       const userID = req.body.userID;
       const allQuestion = await Question.find({creatorID : {$ne:userID}});
       allQuestion.sort((a,b)=>{

            if(a.topic.toLowerCase() < b.topic.toLowerCase())
               return -1;
            else if(a.topic.toLowerCase() > b.topic.toLowerCase())
               return 1;
            else
               return 0;
       })
       let topics = []
       allQuestion.forEach((obj)=>{
           if(!topics?.includes(obj?.topic?.toLowerCase())){
              topics.push(obj?.topic?.toLowerCase());
           }
       })
       res.status(200).json({allQuestion : allQuestion,topics:topics});
    } catch (error) {
       res.status(400).json({message : error.message});
    }
 }

export const getAllQuestion = async(req, res) => {
    try {
       const userID = req.body.userID;
       const allQuestion = await Question.find({});
       let topics = []
       allQuestion.forEach((obj)=>{
           if(!topics?.includes(obj?.topic?.toLowerCase())){
              topics.push(obj?.topic?.toLowerCase());
           }
       })
       allQuestion.sort((a,b)=>{
          if(a.creatorID.toString() === userID && b.creatorID.toString() !== userID){
             return -1;
          }
          else if(a.creatorID.toString() !== userID && b.creatorID.toString() === userID){
             return 1;
          }
          else{
             return 0;
          }
       })
       res.status(200).json({allQuestion : allQuestion,topics:topics});
    } catch (error) {
       res.status(400).json({message : error.message});
    }
 }