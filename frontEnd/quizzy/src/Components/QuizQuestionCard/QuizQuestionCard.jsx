import React, { useEffect, useState } from 'react'
import "./QuizQuestionCard.css"
const QuizQuestionCard = ({quesObj, ansMap, setAnsMap, marks, setMarks, marksPerQues, negMarksPerQues}) => {
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
      // const newMap = new Map(ansMap);
      // newMap.set(event.target.name,[event.target.value]);
      // setAnsMap(newMap);
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
      console.log("marks",marks);
        if(quesObj?.type === 'mrq'){
           console.log("mrq");
           if(isSame(quesObj.answer,ansMap.get(event.target.name))){
               console.log("sahi hai");
               if(ansMap.get(event.target.name).includes(event.target.value)){
                   console.log("include now its wrong");
                   const newArray = ansMap.get(event.target.name);
                   const indexOfValue = newArray.indexOf(event.target.value);
                   if(indexOfValue !== -1){
                      newArray.splice(indexOfValue,1);
                   }
                   newMap.set(event.target.name,newArray);
                   setAnsMap(newMap);
               }
               else{
                   console.log("exclude not its wrong")
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
             
               console.log("marks",marks);
               // - neg marks - pos marks
           }
           else {
            console.log("wrong hai");
            if(ansMap.get(event.target.name).includes(event.target.value)){
                console.log("include hai ");
                const newArray = ansMap.get(event.target.name);
                const indexOfValue = newArray.indexOf(event.target.value);
                if(indexOfValue !== -1){
                  newArray.splice(indexOfValue,1);
                }
                newMap.set(event.target.name,newArray);
                setAnsMap(newMap);
            }
            else{
                console.log("exclude hai");
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
               // + neg marks + pos marks
               console.log("now its right",marks);
            }
            console.log("marks",marks);
          }
        }
        else{
          console.log("non mrq");
          if(ansMap.get(event?.target?.name)[0] === quesObj?.answer[0] && !quesObj?.answer?.includes(event?.target?.value)){
            // -pos - neg
            if(marksPerQues>0){
              setMarks(marks-negMarksPerQues-marksPerQues);
            }
            else{
              setMarks(marks-1)
            }
            console.log("sahi hai glt ho gya");
          }
          else if(ansMap.get(event?.target?.name)[0] !== quesObj?.answer[0] && quesObj?.answer.includes(event?.target?.value)){
            //+ pos+neg
            if(marksPerQues>0){
              setMarks(marks+negMarksPerQues+marksPerQues);
            }
            else{
              setMarks(marks+1)
            }
            console.log("glt tha sahi ho gya");
          }
          newMap.set(event?.target?.name,[event?.target?.value]);
          setAnsMap(newMap);
        }
        
    }
    else{ 
      
      if(quesObj?.type === 'mrq'){
          console.log("first mrq");
          console.log("mrks",marks);
          // - neg
          if(marksPerQues>0){
            setMarks(marks-negMarksPerQues);
          }
          
      }
      else{
        console.log("first non mrq");
         if(quesObj?.answer?.includes(event?.target?.value)){
          if(marksPerQues>0){
            setMarks(marks+marksPerQues);
          }
          else{
            setMarks(marks+1)
          }
           // +pos
           console.log("its right marks",marks);
         }
         else{
          // -neg
          if( marksPerQues>0){
            setMarks(marks - negMarksPerQues);
          }
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
                {/* <div className='option-box'>
                    <div className='input-button-box'><input type="r" id="op1" name={quesObj?._id} value={quesObj?.options[0]} onChange={handleOnClick} checked={ansMap.get(quesObj?._id)===quesObj?.options[0]}/></div>
                    <div className='label-box'><label htmlFor="op2">{quesObj?.options[0]}</label></div>
                </div>
                <div className='option-box'>
                    <div className='input-button-box'><input type="radio" id="op1" name={quesObj?._id}  value={quesObj?.options[1]} onChange={handleOnClick} checked={ansMap.get(quesObj?._id)===quesObj?.options[1]}/></div>
                    <div className='label-box'><label htmlFor="op2"> {quesObj?.options[1]}</label></div>
                </div>
                <div className='option-box'>
                    <div className='input-button-box'><input type="radio" id="op1" name={quesObj?._id}  value={quesObj?.options[2]} onChange={handleOnClick} checked={ansMap.get(quesObj?._id)===quesObj?.options[2]}/></div>
                    <div className='label-box'><label htmlFor="op2"> {quesObj?.options[2]}</label></div>
                </div>
                <div className='option-box'>
                    <div className='input-button-box'><input type="radio" id="op1" name={quesObj?._id}  value={quesObj?.options[3]} onChange={handleOnClick} checked={ansMap.get(quesObj?._id)===quesObj?.options[3]}/></div>
                    <div className='label-box'><label htmlFor="op2"> {quesObj?.options[3]}</label></div>
                </div> */}
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
                  {/* <div className='option-box'>
                      <div className='input-button-box'><input type="radio" id="op1" name={quesObj?._id} value={quesObj?.options[0]} onChange={handleOnClick} checked={ansMap.get(quesObj?._id)===quesObj?.options[0]}/></div>
                      <div className='label-box'><label htmlFor="op2">{quesObj?.options[0]}</label></div>
                  </div>
                  <div className='option-box'>
                      <div className='input-button-box'><input type="radio" id="op1" name={quesObj?._id}  value={quesObj?.options[1]} onChange={handleOnClick} checked={ansMap.get(quesObj?._id)===quesObj?.options[1]}/></div>
                      <div className='label-box'><label htmlFor="op2"> {quesObj?.options[1]}</label></div>
                  </div>
                  <div className='option-box'>
                      <div className='input-button-box'><input type="radio" id="op1" name={quesObj?._id}  value={quesObj?.options[2]} onChange={handleOnClick} checked={ansMap.get(quesObj?._id)===quesObj?.options[2]}/></div>
                      <div className='label-box'><label htmlFor="op2"> {quesObj?.options[2]}</label></div>
                  </div>
                  <div className='option-box'>
                      <div className='input-button-box'><input type="radio" id="op1" name={quesObj?._id}  value={quesObj?.options[3]} onChange={handleOnClick} checked={ansMap.get(quesObj?._id)===quesObj?.options[3]}/></div>
                      <div className='label-box'><label htmlFor="op2"> {quesObj?.options[3]}</label></div>
                  </div> */}
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
                    {/* <div className='option-box'>
                        <div className='input-button-box'><input type="radio" id="op1" name={quesObj?._id} value={quesObj?.options[0]} onChange={handleOnClick} checked={handleChecked(option)}/></div>
                        <div className='label-box'><label htmlFor="op2">{quesObj?.options[0]}</label></div>
                    </div>
                    <div className='option-box'>
                        <div className='input-button-box'><input type="radio" id="op1" name={quesObj?._id}  value={quesObj?.options[1]} onChange={handleOnClick} checked={ansMap.get(quesObj?._id)===quesObj?.options[1]}/></div>
                        <div className='label-box'><label htmlFor="op2"> {quesObj?.options[1]}</label></div>
                    </div>
                    <div className='option-box'>
                        <div className='input-button-box'><input type="radio" id="op1" name={quesObj?._id}  value={quesObj?.options[2]} onChange={handleOnClick} checked={ansMap.get(quesObj?._id)===quesObj?.options[2]}/></div>
                        <div className='label-box'><label htmlFor="op2"> {quesObj?.options[2]}</label></div>
                    </div>
                    <div className='option-box'>
                        <div className='input-button-box'><input type="radio" id="op1" name={quesObj?._id}  value={quesObj?.options[3]} onChange={handleOnClick} checked={ansMap.get(quesObj?._id)===quesObj?.options[3]}/></div>
                        <div className='label-box'><label htmlFor="op2"> {quesObj?.options[3]}</label></div>
                    </div> */}
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
