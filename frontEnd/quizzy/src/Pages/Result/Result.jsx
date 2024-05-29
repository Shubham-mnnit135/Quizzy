import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "./Result.css"
const Result = () => {
  const {state} = useLocation();
  const navigate = useNavigate();
  return (
    <div className='result-container'>
      <div className='result-box'>
         <h2>Thanks for the Submission</h2>
         <h2>Your Score : {state?.marks}/{state?.totalMarks}</h2>
         <h2>Your Suggestion :</h2>
         <textarea   maxLength={200} className='suggestion-box'/>
         <div className='suggestion-buttons'>
            <button className='suggestion-button'>Submit</button>
            <button 
              className='suggestion-button' 
              onClick={()=> {navigate('/protected/home',{replace:true})}}
            >
              Skip
            </button>
         </div>
      </div>
    </div>
  )
}

export default Result
