import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import "./ResultOfQuiz.css"
import ResultListItem from '../../Components/ResultListItem/ResultListItem';
import { toast } from 'react-toastify';

const ResultOfQuiz = () => {
  const {state} = useLocation();
  const [resultList,setResultList] = useState([]);
  useEffect(()=>{
     const fetch = async() =>{
        try {
            const token = localStorage.getItem('token'); 
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const res = await axios.post("http://localhost:8000/studentRecord/resultOfQuiz",{quizID:state?.quiz?._id});
            setResultList(res?.data?.list);
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
    <div className='result-list-container'>
       <div className='result-list-box'>
          <div className='list-box-header'>
            <div className='list-box-header-item'><h3>Name</h3></div>
            <div className='list-box-header-item'><h3>Date</h3></div>
            {/* <div className='list-box-header-item'><h3>Time</h3></div> */}
            <div className='list-box-header-item'><h3>Duration</h3></div>
            <div className='list-box-header-item'><h3>Marks</h3></div>
          </div>
          <div className='list-box-data'>
            {
                resultList?.length && (
                        resultList?.map((result,index)=>{
                            return <ResultListItem key={index} result={result}  />
                        })
                    )
            }
          </div>
       </div>
    </div>
  )
}

export default ResultOfQuiz
