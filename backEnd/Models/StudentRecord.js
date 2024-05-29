import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const studentRecordSchema = mongoose.Schema({
  studentID: {
    type: ObjectId,
    ref: "User",
  },
  username: {
    type: String,
    required: [true, "username is required"],
    trim: true,
    text: true,
  },
  quizID: {
    type: ObjectId,
    ref: "Quiz",
  },
  marks: {
    type: Number,
    required: [true, "marks is required"],
  },
  totalMarks: {
    type: Number,
    required: [true, "totalMarks is required"],
  },
  timeTaken : {
    type : Number
  }
},
{
  timestamps: true,
}
);

const StudentRecord = mongoose.model("StudentRecord", studentRecordSchema);
export default StudentRecord;