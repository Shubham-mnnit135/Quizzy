import mongoose from 'mongoose';
const {ObjectId} = mongoose.Schema;
const quizSchema = new mongoose.Schema({
  creatorID : {
    type: ObjectId,
    ref: 'User', 
    required: true
  },
  topics: [{
    type: String,
    required: true
  }],
  questions: [{
        type: ObjectId,
        ref: "Question",
  }],
  type:{
    type: String,
    required: [true, "type is required"],
    trim: true,
    text: true,
  },
  startTime:{
    type: Date,
  },
  endTime:{
    type: Date
  },
  duration:{
    type:Number
  },
  marks:{
     type:mongoose.Schema.Types.Decimal128
  },
  negMarks:{
    type:mongoose.Schema.Types.Decimal128
  }
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;