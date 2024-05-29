import React, { useEffect, useState } from 'react'
import "./QuestionCard.css"

import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
export const QuestionCard = ({quesObj}) => {

  const [answer, setAnswer] = useState(false);
  
  useEffect(()=>{
      setAnswer(false);
  },[quesObj]);
  
  return (
    <div className='questioncard'>
      <div className="question">
         <p> Q. {quesObj?.question}</p>
      </div>
      <div className="options">
         {
            quesObj.options.map((option,index)=>{
              return (
                <div className="option" key={index}>
                  <div className='option-index-box'>{`${String.fromCharCode(index+65)})`}</div>
                  <div className='option-label'><label htmlFor="op1">{option}</label></div>
                </div>
              )
            })
         }
        {/* <div className="option">
            <div className='option-button-box'><input type="radio" name={quesObj?._id} id="op1" value={quesObj?.options[0]}   /></div>
            <div className='option-label'><label htmlFor="op1">{quesObj?.options[0]}</label></div>
        </div>
        <div className="option">
            <div className='option-button-box'><input type="radio" name={quesObj?._id} id="op2" value={quesObj?.options[1]}   /></div>
            <div className='option-label'><label htmlFor="op2">{quesObj?.options[1]}</label></div>
        </div>
        <div className="option">
           <div className='option-button-box'><input type="radio" name={quesObj?._id} id="op3" value={quesObj?.options[2]}   /></div>
            <div className='option-label'><label htmlFor="op3">{quesObj?.options[2]}</label></div>
        </div>
        <div className="option">
            <div className='option-button-box'><input type="radio" name={quesObj?._id} id="op4" value={quesObj?.options[3]}   /></div>
            <div className='option-label'><label htmlFor="op4">{quesObj?.options[3]}</label></div>
        </div> */}
      </div>
      <div className='answer-box'>
            <button className='ans-show-button'>
                 <p>Answer</p>
                 {
                    answer === false ?(
                       <FaAngleDown className='up-down-button' onClick={()=> setAnswer(true)}/>
                    ):(
                      <FaAngleUp className='up-down-button' onClick={()=> setAnswer(false)}/>
                    )
                 }
            </button>
            {
              answer===true &&(
                quesObj.answer.map((ans,index)=>{
                  return <div className='answer' key={index}><p>{ans}</p></div>
                })
              )
            }
      </div>
    </div>
  )
}

