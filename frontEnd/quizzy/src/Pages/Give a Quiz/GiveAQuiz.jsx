
import React, { useState} from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import { TiDelete } from "react-icons/ti";
import './GiveAQuiz.css'; 
import { toast } from 'react-toastify';
const GiveAQuiz = () => {
  
  const [numberOfQuestions, setNumberOfQuestions] = useState('');
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [inputTopic, setInputTopic] = useState('');
  const [quizIDValue, setQuizIDValue] = useState(null);
  const [rightBlur, setRightBlur] = useState(true);

  const navigate = useNavigate();

  const handleTopicChange = (event) => {
    setInputTopic(event.target.value);
  };

  const handleAddTopic = () => {
    if (inputTopic && !selectedTopics.includes(inputTopic)) {
      setSelectedTopics([...selectedTopics, inputTopic]);
      setInputTopic('');
    }
  };

  const handleRemoveTopic = (topicToRemove) => {
    const updatedTopics = selectedTopics.filter((topic) => topic !== topicToRemove);
    setSelectedTopics(updatedTopics);
  };


   
    const handleFetchQuestions = async () => {
      try {
        const token = localStorage.getItem('token'); 
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        if(numberOfQuestions!=='' && selectedTopics.length>0){
          const response = await axios.post('http://localhost:8000/quiz/giveQuiz', {
            count:numberOfQuestions,
            topics: selectedTopics,
          });
          
          const data = {id:response?.data?.quizID};
          navigate('/protected/quiz-page',{replace:true,state:{data}});
        } 
        else{
           toast.error("Number of Questions and Topic name both are Required")
        }
        
      } catch (error) {
        if(error?.response && error?.response?.status===400)
            toast.error(error?.response?.data?.message);
         
        else
            toast.error(error.message);
      }
    };

  return (
    <div className="quiz-container">
      <div className='top'>
        <div className='buttons'>
          <button className='btn-left' onClick={() => setRightBlur(true)}>Random Quiz</button>
          <button className='btn-right' onClick={() => setRightBlur(false)}>Join With Id</button>
        </div>
      </div>
      <div className='buttom'>
        <div className={`left ${ !rightBlur ? "blur" :"non-blur"}`}>
            <div className="quiz-title"><h1 >Create Quiz for Practice</h1></div>
            <div className='count-question'>
              <label>Question Count:</label>
              <input
                className="quiz-input"
                type="number"
                value={numberOfQuestions}
                onChange={(e) => setNumberOfQuestions(e.target.value)}  
              />
            </div>
            <div className='topic-input'>
              <label>Topics:</label>
              <div className="topic-input-container">
                <input
                  className="quiz-input"
                  type="text"
                  value={inputTopic}
                  onChange={handleTopicChange}
                  placeholder="Enter a Topic"
                />
                <button className="add-button" onClick={handleAddTopic}>Add</button>
              </div>
              <div className="selected-topics">
                {selectedTopics.map((topic) => (
                  <div key={topic} className="selected-topic">
                    <div className='topic'>{topic}</div>
                    <div className="delete-button"><TiDelete className='cross_button'  onClick={() => handleRemoveTopic(topic)} /></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="fetch-button" >
               <button  onClick={handleFetchQuestions}>Fetch Questions</button>
            </div>
        </div>
        <div className={`right ${ rightBlur ? "blur" :"non-blur"}`}>
            <div className='box-title'><h1>Attend With Quiz Id</h1></div>
            <div className='id-box'>
              <label className='id-box-label'>Quiz ID:</label>
              <input
                className="id-input"
                type="text"
                value={quizIDValue}
                onChange={(e) => setQuizIDValue(e.target.value)}  
              />
            </div>
            <div className='button-box'>
               <button 
                 className="btn_fetch" 
                 onClick={() =>{
                  const data = {id:quizIDValue}
                  if(quizIDValue.length===24){
                    navigate('/protected/quiz-page',{replace:true, state:{data}})
                  }
                  else{
                    toast.error('The quiz ID must be 24 characters long')
                  }
                 }}
               >
                 Fetch Quiz
               </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default GiveAQuiz;