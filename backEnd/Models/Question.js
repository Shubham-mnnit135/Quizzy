import mongoose from "mongoose";
const  {ObjectId} = mongoose.Schema;
const questionSchema = new mongoose.Schema({
    type : {
       type:String,
       required : true,
    },
    topic : {
        type : String,
        required : true,
    },
    question : {
        type : String,
        required : true,
    },
    options :[{
        type : String,
        required : true,
    }],
    answer : [{
        type : String,
        required : true,
    }],
    creatorID : {
        type : ObjectId,
        ref : "User",
    }
},
{
    timestamps : true
})

const Question = mongoose.model('Question', questionSchema);

export default Question;