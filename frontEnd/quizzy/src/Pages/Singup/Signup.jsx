import React, { useState } from 'react'
import axios from 'axios';
import './Signup.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { IoIosEye, IoIosEyeOff } from "react-icons/io";


const Signup = () => {
  const [userInfo, setUserInfo] = useState({"username":"","email":"","password":""});
  const [showSignupPass,setShowSignupPass] = useState(false);
  const [otp, setOtp] = useState(false);
  const navigate = useNavigate();

  const handleResend = async(event) =>{
     event.preventDefault();
     try {
      if(userInfo.username !=="" && userInfo.email !=="" ){
         if(userInfo?.password.length >= 8){
                const res = await axios.post('http://localhost:8000/user/otpVerify',userInfo);
                console.log("res",res);
                toast.success(res?.data?.message);
                userInfo.otp = "";
                setOtp(true);
         }
         else{
            toast.error("Password should be at least 8 characters long")
         }
      }
      else{
         toast.error("Both username and email are required")
      }
     } catch (error) {
      if(error?.response && error?.response?.status===400)
         toast.error(error?.response?.data?.message);
      else
         toast.error(error.message);
     }
  }

  const handleSubmit = async(event)=>{
         event.preventDefault();
         try {
            if(userInfo.username !=="" && userInfo.email !=="" ){
               if(userInfo?.password.length >= 8){
                  if(userInfo.otp !==''){
                     await axios.post('http://localhost:8000/user/signup', userInfo);
                     toast.success("Registration Successful!");
                     navigate('/login');
                  }
                  else{
                     toast.error('Please enter OTP');
                  }
               }
               else{
                  toast.error("Password should be at least 8 characters long")
               }
            }
            else{
               toast.error("Both username and email are required")
            }
         } catch (error) {
            if(error?.response && error?.response?.status===400)
               toast.error(error?.response?.data?.message);
            else
               toast.error(error.message);
         }
  }

  const handleOnChange = (event) =>{
       event.preventDefault();
       setUserInfo({...userInfo,[event.target.name]:event.target.value})  
  }




  return (
    <div className="signup">
       
       <div className='signup-left'>
         <img src="./signup_page.svg" alt="user-profile"/>
       </div>
       
       <div className="signup-right">
          <form onSubmit={handleSubmit} className='form'>
             <div className="inputFeild">
                <label htmlFor="username">Username</label>
                <div className='input-for-signup'>
                  <input type="text" id="username" placeholder='Username'  name="username" value={userInfo.username} onChange={handleOnChange}/>
                </div>
             </div>
             <div className="inputFeild">
                <label htmlFor="email">Email</label>
                <div className='input-for-signup'>
                  <input type="email" id="email" placeholder='xyz@gmail.com' name="email" value={userInfo.email} onChange={handleOnChange}/>
                </div>
             </div>
             <div className="inputFeild">
                <label htmlFor="password">Password</label>
                <div className='input-for-signup'>
                    <input type={showSignupPass === false?'password':'text'} id="password" placeholder='******' name="password" value={userInfo.password} onChange={handleOnChange}/>
                    {
                     showSignupPass === true ?(
                        <IoIosEye onClick={()=>{setShowSignupPass(!showSignupPass)}} className='show-pass-icon'/>
                     ):(
                        <IoIosEyeOff onClick={()=>{setShowSignupPass(!showSignupPass)}} className='show-pass-icon'/>
                     )
                    }
                </div>
             </div>
             {
               otp === false ? (
                  <></>
               ): (
                  <div className="inputFeild">
                     <label htmlFor="otp">OTP</label>
                     <div className='input-for-signup'>
                        <input type="text" id="otp" placeholder='123456' name="otp" value={userInfo?.otp} onChange={handleOnChange}/>
                        <button onClick={handleResend}  className='resend'>Resend</button>
                     </div>
                  </div>
               )
             }
             {
               otp === false? (
                  <button onClick={handleResend} className='signup'>Next</button>
               ):(
                  <button type="submit" className='signup'>Sign Up</button>
               )
             }
          </form>
       </div>
    </div>
  )
}

export default Signup
