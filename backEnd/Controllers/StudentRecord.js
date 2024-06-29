import StudentRecord from "../Models/StudentRecord.js";
import { HtmlContentForQuizSubmission } from "../Utils/MailForQuizSubmission.js";
import { sendMail } from "../Utils/sendMail.js";
export const addStudentRecord = async(req, res) => {
    try{
        const record = await StudentRecord.findOne({studentID: req?.body?.userID, quizID:req?.body?.quizID});
        if(record){
           throw new Error("Quiz already submitted!!")
        }
        else{
            const record = {
                studentID : req?.body?.userID,
                username: req?.body?.username,
                quizID : req?.body?.quizID,
                marks : req?.body?.marks,
                totalMarks : req?.body?.totalMarks,
                right: req?.body?.right,
                wrong:req?.body?.wrong,
                notAnswered: req?.body?.notAnswered,
                timeTaken : `${req?.body?.timeTaken ? req?.body?.timeTaken: 0}`
            }
            
            await StudentRecord.create(record);
            sendMail(req?.body?.email,"Quizzy for Quiz","",HtmlContentForQuizSubmission(record.username, record.quizID, record.marks, record.totalMarks, record.timeTaken, record.right, record.wrong, record.notAnswered));
            res.status(200).json({message : "Thanks for the Submission"})
        }
        
    } 
    catch (error) {
        res.status(400).json({success : false ,message : error.message});
    }
}


export const myRecords = async(req,res) =>{
    try {
        const studentID = req?.body?.userID;
        const records = await StudentRecord.find({ studentID });
        let marks=0;
        let right=0;
        let wrong=0;
        let notAnswered=0;
        let totalMarks=0;
        const quizPer=[];
        let index=0;
        for(let quiz of records){
           marks+=quiz?.marks;
           right+=quiz?.right;
           wrong+=quiz?.wrong;
           notAnswered+=quiz?.notAnswered;
           totalMarks+=quiz?.totalMarks;
           index++;
           quizPer.push(Math.round((quiz.marks/quiz?.totalMarks)*100));
        }
        let performance  = {};
        if(totalMarks !== 0){
            performance.right = Math.round((right/(right+wrong+notAnswered))*100);
            performance.wrong = Math.round((wrong/(right+wrong+notAnswered))*100);
            performance.notAnswered = 100 - performance.right - performance.wrong;
        }
        res.status(200).json({success:true,quizs:records,performance:performance,quizPer:quizPer});
    } 
    catch (error) {
        res.status(400).json({success: false,message:error.message})
    }
}

export const resultOfQuiz = async(req,res) => {
      try {
        const list = await StudentRecord.find({ quizID: req?.body?.quizID });
        res.status(200).json({success:true,list:list});
      } catch (error) {
        res.status(400).json({success:false,message:error.message});
      }
}