import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from "cloudinary";
import fs from 'fs';

export const connection = async() =>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("db has connected ");
    }
    catch{
        console.log('connection error');
    }
}

export const verifyToken = async(req, res, next) => {
    // console.log("req",req)
    // console.log("cookie",req.cookies)
    // console.log("token",req.cookies.token)
     try {
         //const token = req.cookies.token;
        
        const token = req.headers.authorization.split(' ')[1];
         if(token){
            // const data = jwt.verify(req.cookies.token,process.env.TOKEN_SECRET);
            const data = jwt.verify(token,process.env.TOKEN_SECRET); // new added lines
            req.body.userID = data?.userID;
            next();
         }
         else{
            res.status(200).json({success : false, message : "token is not available"})
         }
     } catch (error) {
        res.status(400).json({success : false, message : "unauthorized person"});
     }
}

cloudinary.config({ 
    cloud_name: "dadhgeeof",
    api_key: "575816619554879",
    api_secret: "FgvQbOT4myWW1fpOaOjzSaaTR0c"
});

export const uploadOnCloudinary = async(localFilePath) => {
   try {
     if(!localFilePath) return null;
     const response = await cloudinary.uploader.upload(localFilePath,{resource_type:'auto'});
     fs.unlinkSync(localFilePath);
     return response;
   } catch (error) {
      fs.unlinkSync(localFilePath);// remove locally save temp file when uploading failed 
   }
}

