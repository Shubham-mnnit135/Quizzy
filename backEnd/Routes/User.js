import express from 'express';
import { Signup, Signin, Upload, updateUserName, updatePassword } from '../Controllers/User.js';
import { upload } from '../Middlewares/Multer.js';
import { verifyToken } from '../utils.js';
const router = express.Router();

router.post('/signup', Signup);
router.post('/signin', Signin);
router.post('/upload',upload.single('profile'),Upload);
router.post('/updateUsername', verifyToken,updateUserName)
router.post('/updatePassword', verifyToken,updatePassword)
export {router as User};