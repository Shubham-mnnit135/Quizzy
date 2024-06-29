import mongoose from "mongoose";


export const connection = async() =>{
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("db has connected ");
    }
    catch{
        console.log('connection error');
    }
}
