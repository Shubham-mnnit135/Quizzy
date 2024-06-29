import express  from "express";
import { addQuestion, getAllQuestion, getAllQuestionforPrepration } from "../Controllers/Question.js";
import { verifyToken } from "../Middlewares/Authentication.js";

const router  = express.Router();

router.post('/addQuestion', verifyToken, addQuestion)
router.get('/getAllQuestionforPrepration', verifyToken, getAllQuestionforPrepration)
router.get('/getAllQuestion',verifyToken, getAllQuestion)


export {router as Question};