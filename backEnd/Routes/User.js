import express from 'express';
import { Signup, Signin, Upload, updateUserName, updatePassword, otpVerify } from '../Controllers/User.js';
import { upload } from '../Middlewares/Multer.js';
import { verifyToken } from '../Middlewares/Authentication.js';
const router = express.Router();

router.post('/signup', Signup);
router.post('/otpVerify', otpVerify);
router.post('/signin', Signin);
router.post('/upload',verifyToken,upload.single('profile'),Upload);
router.post('/updateUsername', verifyToken,updateUserName)
router.post('/updatePassword', verifyToken,updatePassword)
export {router as User};