import React, { useEffect, useState } from 'react'
import "./QuizQuestionCard.css"
const QuizQuestionCard = ({quesObj, ansMap, setAnsMap, marks, rightQ, setRightQ, wrongQ, setWrongQ, setMarks, marksPerQues, negMarksPerQues}) => {
  console.log(quesObj)
  const [valueOfInput,setValueOfInput] = useState('');
  useEffect(()=>{
       if(ansMap.has(quesObj?._id)){
            setValueOfInput(ansMap.get(quesObj?._id)[0]);
       }
       
  },[quesObj?._id])

  const handleOnChnage = (event) => {
      event.preventDefault();
      setValueOfInput(event.target.value);
      handleOnClick(event);
  }

  const handleChecked = (option) => {
    return ansMap.get(quesObj?._id)?.includes(option) || false;
  }

  const isSame = (arr1, arr2) => {
      if(arr1.length !== arr2.length){
        return false;
      }
      return arr1.every((element)=> arr2.includes(element));
  }

  const handleOnClick = (event) => {
    const newMap = new Map(ansMap);
    if(ansMap.has(event?.target?.name)){
        if(quesObj?.type === 'mrq'){
           if(isSame(quesObj.answer,ansMap.get(event.target.name))){
               if(ansMap.get(event.target.name).includes(event.target.value)){
                   const newArray = ansMap.get(event.target.name);
                   const indexOfValue = newArray.indexOf(event.target.value);
                   if(indexOfValue !== -1){
                      newArray.splice(indexOfValue,1);
                   }
                   newMap.set(event.target.name,newArray);
                   setAnsMap(newMap);
               }
               else{
                   const newArray = ansMap.get(event.target.name);
                   newArray.push(event.target.value);
                   newMap.set(event.target.name,newArray);
                   setAnsMap(newMap);
               }
               if(marksPerQues>0){
                 setMarks(marks-negMarksPerQues-marksPerQues);
               }
               else{
                 setMarks(marks-1)
               }
               setRightQ(rightQ-1);
               setWrongQ(wrongQ+1);
           }
           else {
            if(ansMap.get(event.target.name).includes(event.target.value)){
                const newArray = ansMap.get(event.target.name);
                const indexOfValue = newArray.indexOf(event.target.value);
                if(indexOfValue !== -1){
                  newArray.splice(indexOfValue,1);
                }
                newMap.set(event.target.name,newArray);
                setAnsMap(newMap);
            }
            else{
                const newArray = ansMap.get(event?.target?.name);
                newArray.push(event?.target?.value);
                newMap.set(event?.target?.name,newArray);
                setAnsMap(newMap);
            }
            if(isSame(quesObj?.answer,ansMap.get(event?.target?.name))){
                if(marksPerQues>0){
                  setMarks(marks+negMarksPerQues+marksPerQues);
                }
                else{
                  setMarks(marks+1)
                }
               setRightQ(rightQ+1);
               setWrongQ(wrongQ-1);
            }
          }
        }
        else{
          if(ansMap.get(event?.target?.name)[0] === quesObj?.answer[0] && !quesObj?.answer?.includes(event?.target?.value)){
            if(marksPerQues>0){
              setMarks(marks-negMarksPerQues-marksPerQues);
            }
            else{
              setMarks(marks-1)
            }
            setRightQ(rightQ-1);
            setWrongQ(wrongQ+1);
          }
          else if(ansMap.get(event?.target?.name)[0] !== quesObj?.answer[0] && quesObj?.answer.includes(event?.target?.value)){
            if(marksPerQues>0){
              setMarks(marks+negMarksPerQues+marksPerQues);
            }
            else{
              setMarks(marks+1)
            }
            setRightQ(rightQ+1);
            setWrongQ(wrongQ-1);
          }
          newMap.set(event?.target?.name,[event?.target?.value]);
          setAnsMap(newMap);
        }
        
    }
    else{ 
      
      if(quesObj?.type === 'mrq'){
          if(marksPerQues>0){
            setMarks(marks-negMarksPerQues);
          }
          setWrongQ(wrongQ+1);
          
      }
      else{
         if(quesObj?.answer?.includes(event?.target?.value)){
          if(marksPerQues>0){
            setMarks(marks+marksPerQues);
          }
          else{
            setMarks(marks+1)
          }
           setRightQ(rightQ+1);
         }
         else{
          if( marksPerQues>0){
            setMarks(marks - negMarksPerQues);
          }
          setWrongQ(wrongQ+1);
         }
      }
      newMap.set(event?.target?.name,[event?.target?.value]);
      setAnsMap(newMap);
    }
}

  return (
    <div className='question-container'>
       <div className='question-box'>
         Q : {quesObj?.question}
       </div>
       <div className='options-box'>
         {
            quesObj?.type === 'mrq' ? 
            (
              <>
                {
                  quesObj?.options?.map((option,index)=>{
                   return (
                    <div className='option-box' key={index}>
                      <div className='input-checkbox-button'><input type="checkbox" id="op1" name={quesObj?._id} value={option} onChange={handleOnClick} checked={handleChecked(option)}/></div>
                      <div className='label-box'><label htmlFor="op2">{option}</label></div>
                   </div>)
                  })
                }
                
              </>
            ):
            (
              quesObj?.type === 'mcq' ? (
                <>
                  {
                    quesObj?.options?.map((option,index)=>{
                    return (
                      <div className='option-box' key={index}>
                        <div className='input-button-box'><input type="radio" id="op1" name={quesObj?._id} value={option} onChange={handleOnClick} checked={handleChecked(option)}/></div>
                        <div className='label-box'><label htmlFor="op2">{option}</label></div>
                      </div>)
                    })
                  }
                  
                </>
              ): (
                quesObj?.type === 'TF' ? (
                  <>
                    {
                      quesObj?.options?.map((option,index)=>{
                      return (
                        <div className='option-box' key={index}>
                          <div className='input-button-box'><input type="radio" id="op1" name={quesObj?._id} value={option} onChange={handleOnClick} checked={handleChecked(option)}/></div>
                          <div className='label-box'><label htmlFor="op2">{option}</label></div>
                        </div>)
                      })
                    }
                    
                  </>
                ): (
                  quesObj?.type === 'fill' ? (
                    <> 
                      <div className='option-box'>
                          <div className='input-ans-box'>{`Ans: `}<input type="text" id="op1" name={quesObj?._id} value={valueOfInput} onChange={handleOnChnage} /></div>
                      </div>
                    </>
                  ):
                  (
                    <>
                      {
                        quesObj?.options?.map((option,index)=>{
                        return (
                          <div className='option-box' key={index}>
                            <div className='input-button-box'><input type="radio" id="op1" name={quesObj?._id} value={option} onChange={handleOnClick} checked={handleChecked(option)}/></div>
                            <div className='label-box'><label htmlFor="op2">{option}</label></div>
                          </div>)
                        })
                      }
                    </>
                  )
                )
              )
            )
         }
       </div>

    </div>
  )
}

export default QuizQuestionCard
