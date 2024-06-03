import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, } from 'react-router-dom'
import "./Quizpage.css"
import QuizQuestionCard from '../../Components/QuizQuestionCard/QuizQuestionCard';
import { userContext } from '../../Context/Context';
import { toast } from 'react-toastify';
import Timer from '../../Components/QuizTimer/Timer';


const Quizpage = () => {
  const {state} = useLocation();
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [ansMap, setAnsMap] = useState(new Map());
  const [marks, setMarks] = useState(0);
  const [rightQ, setRightQ] = useState(0);
  const [wrongQ, setWrongQ] = useState(0);
  const [duration, setDuration] = useState(0);
  const [marksPerQues, setMarksPerQues] = useState(0);
  const [negMarksPerQues, setNegMarksPerQues] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const {account} = useContext(userContext);
   
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); 
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; 
  
  // for timer
  const time = new Date();
  time.setSeconds(time.getSeconds() + duration*60);
  //
  
  
  useEffect(()=>{
     const fetch = async() =>{
        try {
            const id = state?.data?.id;
            // console.log("id:",id);
            const res = await axios.post("http://localhost:8000/quiz/quizById",{quizID:state?.data?.id}); 
            // console.log("res",res);
            setQuestions(res?.data?.newQuiz?.questions);
            setDuration(res?.data?.newQuiz?.duration);
            setMarksPerQues(parseFloat(res?.data?.newQuiz?.marks));
            setNegMarksPerQues(parseFloat(res?.data?.newQuiz?.negMarks));
            
        } catch (error) {
          if(error.response && error.response.status===400)
              toast.error(error.response.data.message);
          else
              toast.error(error.message);
          const timeoutId = setTimeout(() => {
            navigate('/protected/home',{replace:true})
          }, 5000);
        }
     }
     fetch();
  },[state, navigate])

 

  const handleSubmit = async() =>{
    try {
      alert('Quiz submitted!');
      const notAns = questions?.length - rightQ - wrongQ;
      if(duration !== 0){
        await axios.post("http://localhost:8000/studentRecord/addStudentRecord",{quizID:state?.data?.id,username:account?.username,marks:marks,totalMarks:`${marksPerQues>0 ? questions?.length*marksPerQues : questions?.length*1}`, right:rightQ, wrong:wrongQ, notAnswered: notAns,timeTaken:`${duration*60 - elapsedTime}`});
      } 
      else{
         await axios.post("http://localhost:8000/studentRecord/addStudentRecord",{quizID:state?.data?.id,username:account?.username,marks:marks,totalMarks:`${marksPerQues>0 ? questions?.length*marksPerQues : questions?.length*1}`,right:rightQ, wrong:wrongQ, notAnswered: notAns,});
      }
      navigate("/protected/result",{state:{marks:marks,totalMarks:`${marksPerQues>0 ? questions?.length*marksPerQues : questions?.length*1}`}})
    } catch (error) {
      if(error?.response && error?.response?.status===400)
              toast.error(error?.response?.data?.message);
      else
              toast.error(error.message);

      navigate("/protected/home");
    }
  }

  const handleTimerComplete = async() => {
      
      try {
        alert('Time is up! Submitting your quiz.');
         const notAns = questions?.length - rightQ - wrongQ;
         await axios.post("http://localhost:8000/studentRecord/addStudentRecord",{quizID:state?.data?.id,username:account?.username,marks:marks,totalMarks:`${marksPerQues>0 ? questions?.length*marksPerQues : questions?.length*1}`, right:rightQ, wrong:wrongQ, notAnswered: notAns,timeTaken:`${duration*60}`});
         navigate("/protected/result",{state:{marks:marks,totalMarks:`${marksPerQues>0 ? questions?.length*marksPerQues : questions?.length*1}`}})
      } catch (error) {
        if(error?.response && error?.response?.status===400)
          toast.error(error?.response?.data?.message);
        else
          toast.error(error.message);

        navigate("/protected/home");
      }
  };

  return (
    <div className='quiz-page-container' >
        
        <div className='quiz-page-left'>
            <div className='question-pointers'>
                {
                questions?.length && (
                        questions?.map((question,index)=>{
                            return  <div className='question-pointer' onClick={() => setQuestionIndex(index)}>{index+1}</div>
                        })
                )
                }
            </div>
            <div className='quiz-info'>
               <div className='row-1'>
                  <p>Attempted</p>
                  <div className='attempt-count'>
                    {ansMap?.size}
                  </div>
               </div>
               <div className='row-1'>
                  <p>Unattempted</p>
                  <div className='unattempt-count'>
                    {questions?.length-ansMap?.size}
                  </div>
               </div>
            </div>
        </div>
        <div className='quiz-page-right'>
           
           <QuizQuestionCard 
             quesObj={questions[questionIndex]} 
             ansMap={ansMap}  
             setAnsMap={setAnsMap} 
             marks={marks} 
             rightQ={rightQ}
             setRightQ={setRightQ}
             wrongQ={wrongQ}
             setWrongQ={setWrongQ}
             setMarks={setMarks} 
             marksPerQues={marksPerQues} 
             negMarksPerQues={negMarksPerQues}
           />
           <div className='quiz-button'>

               <button 
                className='prev'
                onClick={()=>{
                    setQuestionIndex(questionIndex===0?0:questionIndex-1)
                }}
              > 
                Prev
              </button>

              <button 
               className='next'
               onClick={()=>{
                 setQuestionIndex(questionIndex===questions?.length-1?questionIndex:questionIndex+1)
               }}
              >  
                Next
              </button>
              <button className='submit-quiz' onClick={handleSubmit}>Submit</button>
           </div>
           {
            duration !== 0 ?(
              <Timer  expiryTimestamp={time} handleTimerComplete={handleTimerComplete} setElapsedTime={setElapsedTime}/>
            ): (
                <></>
              )
           }
          
        </div>
        
    </div>
  )
}

export default Quizpage
