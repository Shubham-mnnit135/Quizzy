import  express  from "express";
import  dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connection } from "./utils.js";


import { User } from "./Routes/User.js";
import { Quiz } from "./Routes/Quiz.js";
import { Question } from "./Routes/Question.js";
import { QuizRecord } from "./Routes/QuizRecord.js";
import { StudentRecord } from "./Routes/StudentRecord.js";

dotenv.config();
const app = express();
const option = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true 
}
app.use(cors(option));
app.use(express.json());
app.use(cookieParser());
connection();

app.use('/user', User);
app.use('/question', Question);
app.use('/quiz', Quiz);
app.use('/studentRecord', StudentRecord);
app.use('/quizRecord', QuizRecord);



const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`server is running on the port ${port}`);
})