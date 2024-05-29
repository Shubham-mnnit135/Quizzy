import express from 'express'
import { addStudentRecord, myRecords, resultOfQuiz } from '../Controllers/StudentRecord.js'
import { verifyToken } from '../utils.js'

const router = express.Router()

router.post('/addStudentRecord', verifyToken, addStudentRecord)
router.get('/myRecords', verifyToken, myRecords);
router.post('/resultOfQuiz', verifyToken, resultOfQuiz);
export {router  as StudentRecord}