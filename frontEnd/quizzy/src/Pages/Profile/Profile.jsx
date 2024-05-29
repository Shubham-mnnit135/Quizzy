import React, { useContext, useState } from 'react'
import "./Profile.css"
import { HiOutlineUpload } from 'react-icons/hi'
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { userContext } from '../../Context/Context';
import { toast } from 'react-toastify';
import axios from 'axios';


const Profile = () => {
  const {account, setAccount} = useContext(userContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [userName,setUserName] = useState(account.username);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
 
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('profile', selectedFile);
    formData.append('email', account?.email);
 
    try {
       const res = await axios.post('http://localhost:8000/user/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setAccount({...account,picture:res?.data?.url});
    } catch (error) {
       if(error?.response && error?.response?.status===400)
          toast.error(error?.response?.data?.message);
      else
          toast.error(error.message);
    } 
  };
 
  const handleUserUpdate =async()=>{
    try {
        const res = await axios.post("http://localhost:8000/user/updateUsername",{userName:userName});
        toast.success("Username updated!");
        setAccount({...account,username:userName});
    } catch (error) {
        if(error?.response && error?.response?.status===400)
            toast.error(error?.response?.data?.message);
        else
            toast.error(error.message);
    }
  }

  const updatePassword = async()=>{
    try {
        if(confirmPass===newPass){
            if(confirmPass.length>8){
               await axios.post("http://localhost:8000/user/updatePassword",{oldPass,newPass,confirmPass});
               toast.success("Password updated!");
               setNewPass('');
               setOldPass('');
               setConfirmPass('');
            }
            else{
                toast.error("New Password should have at least 8 characters")
            }
        }
        else{
            toast.error("confirm Password and New Password must be same")
        }
    } catch (error) {
        if(error?.response && error?.response?.status===400)
            toast.error(error?.response?.data?.message);
        else
            toast.error(error.message);
    }
  }
  return (
    <div className='profile-container'>
       <div className='profile-box'>
            <div className='profile-left-side'>
                <div className='profile-image'>
                    <img src={account?.picture} alt="profile" />
                </div>
                <div className='profile-update'>
                    <form onSubmit={handleFormSubmit} enctype="multipart/form-data">
                        <label for="fileUpload"> <HiOutlineUpload className='profile-upload-icon'/> </label>
                        <input type="file" id="fileUpload" name="profile" onChange={handleFileChange} />
                        <button className='profile-upload-button' type="submit">Upload Image</button>
                    </form>
                </div>
            </div>
            <div className='profile-right-side'>
                <div className='profile-information'>
                    <div className='profile-field'>
                        <label htmlFor="username">Username</label>
                        <input type="text" id='username' value={userName} onChange={(event)=>{setUserName(event.target.value)}}/>
                    </div>
                    <div className='profile-field'>
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email"  placeholder={account?.email} disabled/>
                    </div>
                    <div className='profile-field-button'>
                      <button onClick={handleUserUpdate}>Update Username</button>
                    </div>
                    
                </div>
                <div className='password-change'>
                    <div className='password-field'>
                        <label htmlFor="">Old Password</label>
                        <div className='password-field-input'>
                           <input type={showPass===false?'password':"text"} value={oldPass} onChange={(event)=>{setOldPass(event.target.value)}}/>
                           {
                             showPass === false ?(
                                <IoIosEyeOff className='pass-eye-icons' onClick={()=>{setShowPass(!showPass)}}/>
                             ):(
                                <IoIosEye className='pass-eye-icons' onClick={()=>{setShowPass(!showPass)}}/>
                             )
                           }
                        </div>
                    </div>
                    <div className='password-field'>
                        <label htmlFor="">New Password</label>
                        <div className='password-field-input'>
                           <input type={showPass===false?'password':"text"} value={newPass} onChange={(event)=>{setNewPass(event.target.value)}}/>
                           {
                             showPass === false ?(
                                <IoIosEyeOff className='pass-eye-icons' onClick={()=>{setShowPass(!showPass)}}/>
                             ):(
                                <IoIosEye className='pass-eye-icons' onClick={()=>{setShowPass(!showPass)}}/>
                             )
                           }
                        </div>
                    </div>
                    <div className='password-field'>
                        <label htmlFor="">Confirm Password</label>
                        <div className='password-field-input'>
                           <input type={showPass===false?'password':"text"} value={confirmPass} onChange={(event)=>{setConfirmPass(event.target.value)}}/>
                           {
                             showPass === false ?(
                                <IoIosEyeOff className='pass-eye-icons' onClick={()=>{setShowPass(!showPass)}}/>
                             ):(
                                <IoIosEye className='pass-eye-icons' onClick={()=>{setShowPass(!showPass)}}/>
                             )
                           }
                        </div>
                    </div>
                    <div className='password-field-button'>
                      <button onClick={updatePassword}>Change Password</button>
                    </div>

                </div>
            </div>
       </div>
    </div>
  )
}

export default Profile
