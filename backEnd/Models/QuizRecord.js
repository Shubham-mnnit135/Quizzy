import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const quizRecordSchema = mongoose.Schema({
  creatorID: {
    type: ObjectId,
    ref: "User",
  },
  quizID: {
    type: ObjectId,
    ref: "Quiz",
  },
  resutlID : [{
    type : ObjectId,
    ref : 'StudentRecord'
  }]
});

const QuizRecord = mongoose.model("QuizRecord", quizRecordSchema);
export default QuizRecord;