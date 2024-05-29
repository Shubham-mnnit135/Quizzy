import React from 'react'
import { useLocation } from 'react-router-dom'
import "./QuizId.css"
const QuizId = () => {
  const {state} = useLocation();
  
  return (
    <div className='quiz_id_page'>
          <div className='Quiz-heading'><h2>Share this special Quiz ID to join the thrill!</h2></div>
          <div className='Quiz-ID'><h2>{state?.data?.quizID}</h2></div>
    </div>
  )
}

export default QuizId
