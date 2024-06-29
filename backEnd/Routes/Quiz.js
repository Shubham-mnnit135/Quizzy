import express from 'express';
import { createQuiz, giveQuiz, myQuizzes, quizById } from '../Controllers/Quiz.js';
import { quizResult } from '../Controllers/Quiz.js';
import { verifyToken } from '../Middlewares/Authentication.js';

const router = express.Router();

router.post('/giveQuiz', verifyToken, giveQuiz);
router.post('/createQuiz', verifyToken, createQuiz);
router.get('/quizResult', verifyToken, quizResult);
router.get('/myQuizzes', verifyToken, myQuizzes);
router.post('/quizById', verifyToken, quizById);

export {router as Quiz};
