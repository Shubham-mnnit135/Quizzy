import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
    {
       email:{
        type: String,
        required: [true, "email is required"],
        trim: true,
        unique: true,
       },
       otp:{
        type: String,
        required: true,
       },
       otpExpires:{
          type: Date,
          required: true,
       }
    }
) ;

otpSchema.index({ otpExpires: 1 }, { expireAfterSeconds: 0 });
const Otp = mongoose.model("Otp", otpSchema);
export default Otp;