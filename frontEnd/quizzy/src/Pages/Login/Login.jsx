import React, { useContext, useState } from "react";
import axios from "axios";
import "./Login.css";
import { userContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { toast } from "react-toastify";

const Login = () => {

  const [userCredetial, setUserCredential] = useState({
    email: "",
    password: "",
  });
  const [showLoginPass,setShowLoginPass] = useState(false);
  const navigate = useNavigate();
  const {account, setAccount} = useContext(userContext)
  const handleOnChange = (event) => {
      event.preventDefault();
      setUserCredential({...userCredetial,[event.target.name]:event.target.value})
  }

  const handleSubmit = async(event) =>{
      event.preventDefault();
      console.log(userCredetial)

      try {
        if(userCredetial.email !=="" && userCredetial.password !==""){
          const userInfo = await axios.post('http://localhost:8000/user/signin', userCredetial);
          setAccount(userInfo?.data);
          localStorage.setItem('token', userInfo?.data?.token); // new added line
          navigate('/protected/home');
        }
        else{
           toast.error("Email and Password Both are Require");
        }
      } catch (error) {
        if(error.response && error.response.status===400)
            toast.error(error.response.data.message);
         
        else
            toast.error(error.message);
      }
  }

  return (
    <div className="login">
      <div className="login-left">
        <form onSubmit={handleSubmit} className="form">
          <div className="inputFeild">
            <label htmlFor="email">Email</label>
            <div className="login-password-input">
              <input type="email" id="email" placeholder="xyz@gmail.com" name="email" value={userCredetial.email} onChange={handleOnChange}/>
            </div>
            
          </div>
          <div className="inputFeild">
            <label htmlFor="password">Password</label>
            <div className="login-password-input">
              <input type={showLoginPass===false?'password':'text'} id="password" placeholder="******" name="password" value={userCredetial.password} onChange={handleOnChange}/>
              {
                 showLoginPass === true ?(
                  <IoIosEye onClick={()=>{setShowLoginPass(!showLoginPass)}} className="icon-for-show-password"/>
                 ):(
                  <IoIosEyeOff onClick={()=>{setShowLoginPass(!showLoginPass)}} className="icon-for-show-password"/>
                 )
              }
            </div>
            
          </div>
          <button className="signin" type="submit">Sign in</button>
        </form>
      </div>
      <div className="login-right">
        <img className="loginImg" src="./login.svg"/>
      </div>
    </div>
  );
};

export default Login;
