
import jwt from "jsonwebtoken";

export const verifyToken = async(req, res, next) => {
    
    try {
       const token = req.headers.authorization.split(' ')[1];
        if(token){
           // const data = jwt.verify(req.cookies.token,process.env.TOKEN_SECRET);
           const data = jwt.verify(token,process.env.TOKEN_SECRET); // new added lines
           req.body.userID = data?.userID;
           req.body.email = data?.email;
           next();
        }
        else{
           res.status(200).json({success : false, message : "token is not available"})
        }
    } catch (error) {
       res.status(400).json({success : false, message : "unauthorized person"});
    }
}