import React, { useState } from 'react'
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import './QuizAttributes.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useLocation, useNavigate} from 'react-router-dom';

const QuizAttributes = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [disabledAvai, setDisabledAvai] = useState(true);
    const [disabledDuration, setDisabledDuration] = useState(true);
    const [disabledMarks, setDisabledMarks] = useState(true);
    const [disabledNegMarks, setDisabledNegMarks] = useState(true);
    const [marks, setMarks] = useState(0);
    const [negMarks, setNegMarks] = useState(0);
    const [duration, setDuration] = useState(0);
    const navigate = useNavigate();
    const {state} = useLocation();

    const toggleDisabledAvai = () =>{
        if(disabledAvai === true){
            setDisabledAvai(false);
        }
        else{
            setDisabledAvai(true);
            setStartDate(new Date());
            setEndDate(new Date());
        }
    };
    const toggleDisabledDuration = () => {
        if(disabledDuration === true){
            setDisabledDuration(false);
            setDuration(0);
        }
        else{
           setDisabledDuration(true);
           setDuration(0);
        }
    };
    const toggleDisabledMark = () => {
        if(disabledMarks === true){
            setDisabledMarks(false);
            setMarks(0);
        }
        else{
            setDisabledMarks(true);
            setMarks(0);
        }
    };
    const toggleDisabledNegMark = () =>{
        if(disabledNegMarks === true){
            setDisabledNegMarks(false);
            setNegMarks(0);
        }
        else{
            setDisabledNegMarks(true);
            setNegMarks(0);
        }
    };

    const questionWithAtt = {
        startTime:"",
        endTime:"",
        duration:"",
        marks:"",
        negMarks:"",
        questions:state?.data?.questionIds,
    }

    const handleSubmit = async() => {
        try {
            if(negMarks > marks){
                toast.error("Negative Marks must be Less than the Positive Marks");
            }
            else{
                questionWithAtt.duration= duration;
                questionWithAtt.marks = marks;
                questionWithAtt.negMarks = negMarks;
              if(disabledAvai === false){
                questionWithAtt.startTime = startDate;
                questionWithAtt.endTime = endDate;
                if(startDate >= endDate){
                    throw new Error("Start Date must be less thant the End Date")
                }
              }
              const token = localStorage.getItem('token'); 
              axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
              const res = await axios.post('http://localhost:8000/quiz/createQuiz',questionWithAtt);
              const data = {quizID:res?.data?.quizID}
              navigate('/protected/quiz-ID',{replace:true,state:{data}});
            }
        } catch (error) {
            if(error?.response && error?.response?.status===400)
                toast.error(error?.response?.data?.message);
             else
                toast.error(error.message);
        }

    }
  return (
    <div className='att-container'>
         <div className='att-box'>
            <div className='attribute att-1'>
                <div className='att-heading'>
                    <label htmlFor="">Availability</label>
                    <div class="checkbox-wrapper-17" >
                      <input type="checkbox" id="Availability" onClick={toggleDisabledAvai}/>
                      <label for="Availability"></label>
                    </div>
                </div>
                <div className='att-input'>
                    <label htmlFor="">Start</label>
                    <DateTimePicker value={startDate} onChange={setStartDate} disabled={disabledAvai} />
                </div>
                <div className='att-input'>
                    <label htmlFor="">End</label>
                    <DateTimePicker value={endDate} onChange={setEndDate} disabled={disabledAvai}/>
                </div>

               
            </div>
            <div className='attribute att-2'>
                <div className='att-heading'>
                   <label htmlFor="">Duration</label>
                   <div class="checkbox-wrapper-17" >
                      <input type="checkbox" id="Duration" onClick={toggleDisabledDuration} />
                      <label for="Duration"></label>
                   </div>
                </div>
                <div className='att-input'>
                    <label htmlFor="">Time</label>
                    <input type="number" 
                        min={5} 
                        value={duration} 
                        onChange={(event)=>{
                            let value = event.target.value;
                            if (value.length > 1) {
                            event.target.value = value.replace(/^0+/, '');
                            }
                            setDuration(event.target.value)
                        }} 
                        placeholder='HH:MM'
                        disabled={disabledDuration}
                    />
                </div>
            </div>
            <div className='attribute att-2'>
                <div className='att-heading'>
                   <label htmlFor="">Marks</label>
                   <div class="checkbox-wrapper-17" >
                      <input type="checkbox" id="Marks" onClick={toggleDisabledMark}/>
                      <label for="Marks"></label>
                   </div>
                </div>
                <div className='att-input'>
                    <label htmlFor="">Marks Per Ques</label>
                    <input type="number" 
                        min={1} 
                        value={marks} 
                        onChange={(event)=>{
                            let value = event.target.value;
                            if (value.length > 1) {
                            event.target.value = value.replace(/^0+/, '');
                            }
                            setMarks(event.target.value)
                        }} 
                        disabled={disabledMarks}
                    />
                </div>
            </div>
            <div className='attribute att-2'>
                <div className='att-heading'>
                   <label htmlFor="">Negative Marking</label>
                   <div class="checkbox-wrapper-17" >
                      <input type="checkbox" id="Negative Marking" onClick={toggleDisabledNegMark}/>
                      <label for="Negative Marking"></label>
                   </div>
                </div>
                <div className='att-input'>
                    <label htmlFor="">Marks Per Ques</label>
                    <input type="number" 
                        min={0} 
                        value={negMarks} 
                        onChange={(event)=>{
                            let value = event.target.value;
                            if (value.length > 1) {
                            event.target.value = value.replace(/^0+/, '');
                            }
                            setNegMarks(event.target.value);
                        }} 
                        disabled={disabledNegMarks}
                    />
                </div>
            </div>
            <div className='attribute att-3'>
                <button className='add-attribute-submit' onClick={handleSubmit}>submit</button>
            </div>
         </div>
    </div>
  )
}

export default QuizAttributes
