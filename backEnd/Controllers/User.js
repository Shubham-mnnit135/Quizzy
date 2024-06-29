import User from '../Models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { uploadOnCloudinary } from '../Utils/Cloudinary.js';
import { sendMail } from '../Utils/sendMail.js';
import { HtmlContentForRegistration } from '../Utils/MailForRegistration.js';


export const Signup = async(req, res)=>{
    try {
       const check1 = await User.findOne({email : req.body.email});
       const check2 = await User.findOne({username : req.body.username});
       if( check1 ){
          throw new Error("Email is already exist")
       }
       if( check2 ){
          throw new Error("Username is already exist")
       }
       const password = req?.body?.password;
       const hashPassword = await bcrypt.hash(password,10);

       const user = await User.create({
        username : req.body.username,
        email : req.body.email,
        password : hashPassword,
       });
       sendMail(req?.body?.email,"Quizzy for Quiz","",HtmlContentForRegistration(req?.body?.username));
       res.status(200).json({message : "You have registered Successfully"});
    } catch (error) {
        res.status(400).json({success : false, message : error.message});
    }
}



export const Signin = async(req, res) =>{
    try {
        const email = req?.body?.email;
        const password = req?.body?.password;
        const user = await User.findOne({email : email});
        if(user){
            const match = await bcrypt.compare(password, user.password);
            if(match){
                 const token = jwt.sign({userID : user._id,email :email},process.env.TOKEN_SECRET,{expiresIn : "1d"});
                 const userInfo = {
                    username : user?.username,
                    email : user?.email,
                    picture : user?.picture,
                    token : token,
                 }
                 res.status(200).json(userInfo);
            }
            else{
               throw new Error('Incorrect Password');
            }
        }
        else{
            throw new Error('Email does not exist');
        }
    } catch (error) {
        res.status(400).json({success : false, message : error.message});
    }
}

export const Upload = async(req, res) => {
    try {
        console.log("res file",req.file);
        console.log("res file",req.file.path);
        const result = await uploadOnCloudinary(req.file.path);
        const {email} = req.body;
        const user = await User.findOneAndUpdate(
            { email: email },
            { $set: { picture: result?.url } },
            { new: true } 
          );
        res.status(200).json({success:true,url:user.picture});
    } catch (error) {
        res.status(400).json({ success: false, message: error.message});
    }
}

export const updateUserName = async(req,res) =>{
    const {userID, userName} = req.body;
    try {
        const check = await User.findOne({username : userName});
        if(check){
           throw new Error('Username is already Exist')
        }
        else{
            await User.findOneAndUpdate( 
                { _id: userID },
                { $set: { username: userName } },
                { new: true } 
            );
            res.status(200).json({success:true});
        }
    } catch (error) {
        res.status(400).json({success : false, message : error.message});
    }
}


export const updatePassword = async(req, res)=>{
    const {userID,oldPass,newPass,confirmPass} = req.body;
    try {
        const user = await User.findOne({_id:userID});
        console.log("user",user);
        
        if(user){
            const match = await bcrypt.compare(oldPass, user.password);
            if(match){
                const hashPassword = await bcrypt.hash(newPass,10);
                await User.findOneAndUpdate(
                    {_id:userID},
                    {$set: {password:hashPassword}},
                    {new:true}
                );
                res.status(200).json({success:true});
            }
            else{
                throw new Error('Old Password is Wrong');
            }
        }
    } catch (error) {
        res.status(400).json({success:false,message:error.message});
    }
}
