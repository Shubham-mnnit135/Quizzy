import {v2 as cloudinary} from "cloudinary";
import fs from 'fs';

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

