import React, { useEffect, useState } from 'react'
import "./SelectQuestionCard.css"

import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { GrCheckboxSelected } from "react-icons/gr";
import { RiChatDeleteLine } from "react-icons/ri";

export const SelectQuestionCard = ({quesObj, setSelectedQuestions,selectedQuestions}) => {

  const [answer, setAnswer] = useState(false);
  const [pick,setPick] = useState(false);

   useEffect(()=>{
          if(selectedQuestions.includes(quesObj._id)){
            setPick(true);
          }
          else{
             setPick(false);
          }
          setAnswer(false);
   },[quesObj._id])

   const handleSelect = () => {
      if(selectedQuestions.includes(quesObj._id)){
            const updateSelectedQuestion = selectedQuestions.filter((id)=> id!==quesObj._id);
            setSelectedQuestions(updateSelectedQuestion);
      }
      else{
          setSelectedQuestions([...selectedQuestions,quesObj._id]);
      }
   }
  return (
    <div className='questioncard'>
      
      <div className="question">
         <div className='question-data'><p > Q. {quesObj?.question}</p></div>
         <div className='pick-icon'>
          {
            pick === false ?(
              <GrCheckboxSelected  className='question-pick-icon' 
                onClick={() => { setPick(true);handleSelect()}}
              />
            ):(
              <RiChatDeleteLine  className='question-pick-icon' 
               onClick={() => { setPick(false);handleSelect()}}
              />
            )
          }
         </div>
      </div>
      <div className="options">
         {
            quesObj.options.map((option,index)=>{
              return (
                <div className="option" key={index}>
                  <div className='option-button-box'>{`${String.fromCharCode(index+65)})`}</div>
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

