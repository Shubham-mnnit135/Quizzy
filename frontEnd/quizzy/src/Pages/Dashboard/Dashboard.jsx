import React, { useContext, useEffect, useState } from 'react'
import "./Dashboard.css";
import { userContext } from '../../Context/Context';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import ListItem2 from '../../Components/LIstItem/ListItem2';
import ListItem1 from '../../Components/LIstItem/ListItem1';
import { PiStudentBold } from "react-icons/pi";
import { HiOutlineUpload } from "react-icons/hi";
import { FaEdit } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {

  const {account,setAccount} = useContext(userContext);
  const [myRecords, setMyRecord] = useState({});
  const [myQuizzes, setMyQuizzes] = useState([]);
  const [quizPer, setQuizPer] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
    const fetch = async()=>{
        try {
            const token = localStorage.getItem('token'); 
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
            axios.defaults.withCredentials = true;
            const res1 = await axios.get('http://localhost:8000/studentRecord/myRecords') 
            const res2 = await axios.get('http://localhost:8000/quiz/myQuizzes') 
            setMyRecord(res1?.data);
            setQuizPer(res1?.data?.quizPer);
            setMyQuizzes(res2?.data?.myAllQuiz);
        } catch (error) {
         if(error?.response && error?.response?.status===400)
             toast.error(error?.response?.data?.message);
         else
             toast.error(error.message);
        }
    }
    fetch();
  },[])
  
  return (
    <div className='dashboard'>
       <div className='heading'><p>dashboard</p></div>
       <div className='userinfo'>
           <div className="profile">
              <img className="profile-picture" src={account.picture} alt="profile-picture" />
              
           </div>
           <div className="info">
                <h2>{`${account?.username}  ` }<FaEdit onClick={()=>{navigate('/protected/profile')}} className='edit-profile-icon'/></h2>
                <h3>{account?.email}</h3>
                <TbLogout className='account-logout-icon' 
                onClick={()=>{
                  localStorage.removeItem('token');
                  setAccount(null);
                  navigate('/login');
                }}/>
           </div>
       </div>
       <div className='performanceChart'>
         <LineChart
            series={[
               {
                  data: [...quizPer],
                  area: true,
                  color: '#FFE77AFF'
               },
            ]}
            height={300}
         />
       </div>
       <div className="data">
          <div className='data-left'>
            <PieChart
               colors={['#015D53', '#FFE77AFF', '#FBFADA']}
               series={[
                  {
                     data: [
                        {id:0,value:myRecords?.performance?.right,label:'Right'},
                        {id:1,value:myRecords?.performance?.wrong,label:'Wrong'},
                        {id:2,value:myRecords?.performance?.notAnswered,label:'Not Answered'},
                     ]
                  },
               ]}
               width={450}
               height={250}
            />
            <h1 >Performance</h1>
          </div>
          <div className='data-right'>
              <div className='box1'>
                <h2>Generated Quiz</h2>
                <h1>{myQuizzes?.length}</h1>
              </div>
              <div className='box2'>
               <h2>Attended Quiz</h2>
               <h1>{myRecords?.quizs?.length}</h1>
              </div>
          </div>
       </div>

       <div className='list-give-quiz'>
           <h1>List of Attended Quizzes</h1>
           <div className='list-box'>
            {
               myRecords?.quizs?.map((quizInfo,index)=>{
                return  <ListItem1 quiz={quizInfo} key={index}/>
               })
            }
           </div>
       </div>
       <div className='list-created-quiz'>
           <h1>List of Generated Quiz</h1>
           <div className='list-box'>
              {
                myQuizzes?.map((myquiz,index)=>{
                  return <ListItem2 quiz={myquiz} key={index}/>
                })
              }
              
           </div>
       </div>
    </div>
  )
}

export default Dashboard
