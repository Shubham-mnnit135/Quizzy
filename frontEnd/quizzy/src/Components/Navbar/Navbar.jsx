
import {Link} from 'react-router-dom';
import React, { useContext, useState } from 'react'
import { userContext } from '../../Context/Context';
import { FaUserCircle } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import { MdLogout } from "react-icons/md";
import "./Navbar.css";

const Navbar = () => {
  const {account,setAccount} = useContext(userContext);
  let [openMenu, setOpenMenu] = useState(false);
  return (
    <nav className="nav">
        <h1 className='logo' ><Link to="/" >Quizzy</Link></h1>
        <ul className="navList">
            <li className="nav-list-item"> <Link to="/protected/home" >Home</Link> </li>
            <li className="nav-list-item"> <Link to="/protected/giveQuiz">Give A Quiz</Link> </li>
            <li className="nav-list-item"> <Link to="/protected/addQuestion" >Add Question</Link> </li>
            <li className="nav-list-item"> <Link to="/protected/createQuiz" >Create Quiz</Link> </li>
            {
              account ? (
                <Link to='/protected/dashboard'><FaUserCircle className='profileIcon'/></Link>
              ) : (
                <>
                   <li className="nav-list-item"> <Link className="btn" to="/login">Log in</Link> </li>
                   <li className="nav-list-item"> <Link className="btn" to="/signup">Sign Up</Link> </li>
                </>
              )
            }
        </ul>
        <IoIosMenu className='menu' onClick={()=>setOpenMenu(!openMenu)}/>
        {
          openMenu === true && 
          <div className="dropdown" onClick={()=>setOpenMenu(!openMenu)}>
            <Link to="/protected/home" >Home</Link> 
            <Link to="/protected/giveQuiz" >Give a Quiz</Link> 
            <Link to="/protected/addQuestion" >Add Question</Link> 
            <Link to="/protected/createQuiz" >Create Quiz</Link> 
            {
                account ? (
                  <>
                    <Link to='/protected/dashboard'>Dashboard</Link>
                    <Link className="btn" to="/login" onClick={()=>{
                      localStorage.removeItem('token');
                      setAccount(null);
                    }}>Sign Out</Link>
                  </>
                ) : (
                  <>
                    <Link className="btn" to="/login">Log in</Link>
                    <Link className="btn" to="/signup">Sign Up</Link> 
                  </>
                )
              } 
          </div>
        }
    </nav>
  )
}

export default Navbar;
