import React, { useState } from 'react'
import './AddQuestion.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const AddQuestion = () => {


   
  const [type,setType] = useState("mcq");
  const [question,setQuestion] = useState();
  const [options,setOptions] = useState([]);
  const [topic,setTopic] = useState();
  const [answer,setAnswer] = useState();
  
  const navigate = useNavigate();

  function isArraySubset(subset, superset) {
    return subset.every(item => superset.includes(item));
  }
  
  const addQuestion = async() =>{
    try {
      const token = localStorage.getItem('token'); 
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      const ansArray = answer.split(",");
      const newArray = ansArray.map(str => str.trim());
      const questionContent = {
        question:question,
        options:options,
        topic:topic,
        answer:[...newArray],
        type:type
      }
      if(isArraySubset(questionContent.answer, questionContent.options)){
        toast.success("ans match with the options")
        console.log("questionContent",questionContent);
        if(type === "mcq" && questionContent.answer.length > 1){
          questionContent.type = 'mrq';
        }
        else if(type === 'mrq' && questionContent.answer.length == 1){
          questionContent.type = 'mcq';
        }
        const res = await axios.post("http://localhost:8000/question/addQuestion",questionContent);
        toast.success("Your Question Successfully added")
        navigate("/protected/home");
      }
      else{
        console.log("questionContent",questionContent);
        toast.error("Please select an answer that matches one of the options provided")
      }
      
    } catch (error) {
        if(error?.response && error?.response?.status===400)
            toast.error(error?.response?.data?.message);
        else
            toast.error(error.message);
    }

  }
   // till here

   return(
     <div className='addQuestion-container'>
        <div className='type-of-ques'>
                <div className='type-1 type-of-question' onClick={()=>{setType('mcq');setOptions([]);setAnswer('');setTopic('')}}>MCQ</div>
                <div className='type-2 type-of-question' onClick={()=>{setType('mrq');setOptions([]);setAnswer('');setTopic('')}}>MRQ</div>
                <div className='type-3 type-of-question' onClick={()=>{setType('TF');setOptions([]);setAnswer('');setTopic('')}}>True-False</div>
                <div className='type-4 type-of-question' onClick={()=>{setType('fill');setOptions([]);setAnswer('');setTopic('')}}>Short Ans</div>
        </div>
        <div className='addQuestion-box'>
          { 
            type === "mcq" ? (
              <div className='addQuestion'>
                <div className='question-content'>
                    <label htmlFor="" className='question-box-label'>Question</label>
                    <textarea name="question" id="" className='question-box-textarea' value={question} onChange={(event)=>{setQuestion(event.target.value)}}></textarea>
                </div>
                <div className='question-options'>
                  <div className='column1'>
                    <div className='question-content'>
                        <label htmlFor="" className='question-box-label'>Option 1</label>
                        <textarea name="option1" id="" className='question-box-textarea' value={options[0]} onChange={(event)=>{ const newOptions=[...options];newOptions[0]=event.target.value;setOptions(newOptions);}}></textarea>
                    </div>
                    <div className='question-content'>
                        <label htmlFor="" className='question-box-label'>Option 3</label>
                        <textarea name="option3" id="" className='question-box-textarea' value={options[2]} onChange={(event)=>{ const newOptions=[...options];newOptions[2]=event.target.value;setOptions(newOptions);}}></textarea>
                    </div>
                    <div className='question-content'>
                      <label htmlFor="" className='question-box-label'>Topic</label>
                      <textarea name="topic" id="" className='question-box-textarea' value={topic} onChange={(event)=>{setTopic(event.target.value)}}></textarea>
                    </div>
                  </div>
                  <div className='column2'>
                    <div className='question-content'>
                        <label htmlFor="" className='question-box-label'>Option 2</label>
                        <textarea name="option2" id="" className='question-box-textarea' value={options[1]} onChange={(event)=>{ const newOptions=[...options];newOptions[1]=event.target.value;setOptions(newOptions);}}></textarea>
                    </div>
                    <div className='question-content'>
                        <label htmlFor="" className='question-box-label'>Option 4</label>
                        <textarea name="option4" id="" className='question-box-textarea' value={options[3]} onChange={(event)=>{ const newOptions=[...options];newOptions[3]=event.target.value;setOptions(newOptions);}}></textarea>
                    </div>
                    <div className='question-content'>
                        <label htmlFor="" className='question-box-label'>Answer</label>
                        <textarea name="answer" id="" className='question-box-textarea' value={answer} onChange={(event)=>{setAnswer(event.target.value)}}></textarea>
                    </div>
                  </div>
                </div>
                <div className='question-button'>
                    <button className='add-question-button' onClick={addQuestion}>add Question</button>
                </div>
            </div>
            ):(
              type === "TF" ? (
                <div className='addQuestion'>
                    <div className='question-content'>
                        <label htmlFor="" className='question-box-label'>Question</label>
                        <textarea name="question" id="" className='question-box-textarea' value={question} onChange={(event)=>{setQuestion(event.target.value)}}></textarea>
                    </div>
                    <div className='question-options'>
                      <div className='column1'>
                        <div className='question-content'>
                            <label htmlFor="" className='question-box-label'>Option 1</label>
                            <textarea name="option1" id="" className='question-box-textarea' value={options[0]} onChange={(event)=>{ const newOptions=[...options];newOptions[0]=event.target.value;setOptions(newOptions);}}></textarea>
                        </div>
                        <div className='question-content'>
                          <label htmlFor="" className='question-box-label'>Topic</label>
                          <textarea name="topic" id="" className='question-box-textarea' value={topic} onChange={(event)=>{setTopic(event.target.value)}}></textarea>
                        </div>
                      </div>
                      <div className='column2'>
                        <div className='question-content'>
                            <label htmlFor="" className='question-box-label'>Option 2</label>
                            <textarea name="option2" id="" className='question-box-textarea' value={options[1]} onChange={(event)=>{ const newOptions=[...options];newOptions[1]=event.target.value;setOptions(newOptions);}}></textarea>
                        </div>

                        <div className='question-content'>
                            <label htmlFor="" className='question-box-label'>Answer</label>
                            <textarea name="answer" id="" className='question-box-textarea' value={answer} onChange={(event)=>{setAnswer(event.target.value)}}></textarea>
                        </div>
                      </div>

                    </div>
                    <div className='question-button'>
                        <button className='add-question-button' onClick={addQuestion}>add Question</button>
                    </div>
                 </div>
              ):(
                type === "mrq" ?(
                  <div className='addQuestion'>
                    <div className='question-content'>
                        <label htmlFor="" className='question-box-label'>Question</label>
                        <textarea name="question" id="" className='question-box-textarea' value={question} onChange={(event)=>{setQuestion(event.target.value)}}></textarea>
                    </div>
                    <div className='question-options'>
                      <div className='column1'>
                        <div className='question-content'>
                            <label htmlFor="" className='question-box-label'>Option 1</label>
                            <textarea name="option1" id=""  className='question-box-textarea' value={options[0]} onChange={(event)=>{ const newOptions=[...options];newOptions[0]=event.target.value;setOptions(newOptions);}}></textarea>
                        </div>
                        
                        <div className='question-content'>
                            <label htmlFor="" className='question-box-label'>Option 3</label>
                            <textarea name="option3" id="" className='question-box-textarea' value={options[2]} onChange={(event)=>{ const newOptions=[...options];newOptions[2]=event.target.value;setOptions(newOptions);}}></textarea>
                        </div>
                        <div className='question-content'>
                          <label htmlFor="" className='question-box-label'>Topic</label>
                          <textarea name="topic" id="" className='question-box-textarea' value={topic} onChange={(event)=>{setTopic(event.target.value)}}></textarea>
                        </div>
                      </div>
                      <div className='column2'>
                        <div className='question-content'>
                            <label htmlFor="" className='question-box-label'>Option 2</label>
                            <textarea name="option2" id="" className='question-box-textarea' value={options[1]} onChange={(event)=>{ const newOptions=[...options];newOptions[1]=event.target.value;setOptions(newOptions);}}></textarea>
                        </div>

                        <div className='question-content'>
                            <label htmlFor="" className='question-box-label'>Option 4</label>
                            <textarea name="option4" id="" className='question-box-textarea' value={options[3]} onChange={(event)=>{ const newOptions=[...options];newOptions[3]=event.target.value;setOptions(newOptions);}}></textarea>
                        </div>
                        <div className='question-content'>
                              <label htmlFor="" className='question-box-label'>Answer</label>
                              <textarea name="answer" id="" className='question-box-textarea' value={answer} onChange={(event)=>{setAnswer(event.target.value)}}></textarea>
                        </div>
                      </div>

                    </div>
                    <div className='question-button'>
                        <button className='add-question-button' onClick={addQuestion}>add Question</button>
                    </div>
                 </div>
                ):(
                  <div className='addQuestion'>
                      <div className='question-content'>
                          <label htmlFor="" className='question-box-label'>Question</label>
                          <textarea name="question" id="" className='question-box-textarea' value={question} onChange={(event)=>{setQuestion(event.target.value)}}></textarea>
                      </div>
                      <div className='question-options'>
                        <div className='column1'>
                         
                          <div className='question-content'>
                            <label htmlFor="" className='question-box-label'>Topic</label>
                            <textarea name="topic" id="" className='question-box-textarea' value={topic} onChange={(event)=>{setTopic(event.target.value)}}></textarea>
                          </div>
                        </div>
                        <div className='column2'>
                          <div className='question-content'>
                              <label htmlFor="" className='question-box-label'>Answer</label>
                              <textarea name="answer" id="" className='question-box-textarea' value={answer} onChange={(event)=>{setAnswer(event.target.value);setOptions(event.target.value)}}></textarea>
                          </div>
                        </div>

                      </div>
                      <div className='question-button'>
                          <button className='add-question-button' onClick={addQuestion}>add Question</button>
                      </div>
                   </div>
                )
              )
            )
          }
        </div>
     </div>
   )
}

export default AddQuestion;