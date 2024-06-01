import StudentRecord from "../Models/StudentRecord.js";

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
                timeTaken : `${req?.body?.timeTaken ? req?.body?.timeTaken: 0}`
            }
            // console.log("record",record);
            await StudentRecord.create(record);
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
        let totalMarks=0;
        const quizPer=[];
        let index=0;
        for(let quiz of records){
           marks+=quiz.marks;
           totalMarks+=quiz.totalMarks;
           index++;
           quizPer.push(Math.ceil((quiz.marks/quiz.totalMarks)*100));
        }
        // console.log(quizPer);
        let performance = 0
        if(totalMarks !== 0){
            performance = Math.floor((marks/totalMarks)*100);
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
        // console.log("Retrieved records:", list);
        res.status(200).json({success:true,list:list});
      } catch (error) {
        res.status(400).json({success:false,message:error.message});
      }
}