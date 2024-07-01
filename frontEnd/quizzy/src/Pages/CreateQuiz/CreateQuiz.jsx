import React, { useEffect, useState } from 'react';
import "./CreateQuiz.css";
import { TopicCard } from '../../Components/TopicCard/TopicCard';
import {QuestionCard} from '../../Components/QuestionCard/QuestionCard';
import axios from 'axios';
import { ChartsLegend } from '@mui/x-charts/ChartsLegend';
import { SelectQuestionCard } from '../../Components/SelectQuestionCard/SelectQuestionCard';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateQuiz = () => {
    const [allQuestion, setAllQuestion] = useState([]);
    const [filteredQuestion, setFilteredQuestion] = useState([]);
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState([]);
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetch = async()=>{
            try {
                const token = localStorage.getItem('token'); // new added lines
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // new added lines
                const res = await axios.get("http://localhost:8000/question/getAllQuestion");
                setAllQuestion(res?.data?.allQuestion)
                setFilteredQuestion(res?.data?.allQuestion)
                setTopics(res?.data?.topics)
            } catch (error) {
                if(error?.response && error?.response?.status===400)
                    toast.error(error?.response?.data?.message);
                else
                    toast.error(error.message);
            }
        }
        fetch();
    },[])
    
    useEffect(()=>{
           const filter = () => {
                const filtered  = allQuestion.filter(question => question.topic === selectedTopic);
                setFilteredQuestion(filtered);
           }
           filter();
    }
    ,[selectedTopic])

    const handleOnClick = async() =>{
        try {
            const data = {questionIds:selectedQuestions};
            navigate('/protected/quiz-attributes',{state:{data}});
        } catch (error) {
            if(error?.response && error?.response?.status===400)
               toast.error(error?.response?.data?.message);
            else
               toast.error(error.message);
        }
    }
    return(
        <div className="home">
            <div className="topics" >
                {
                    topics?.length && (
                        topics?.map((topic,index)=>{
                            return <TopicCard key={index} topic={topic} setSelectedTopic={setSelectedTopic} />
                        })
                    )
                }                
            </div>
            <div className="questions">
                {
                    filteredQuestion && (
                        filteredQuestion?.map((quesObj,index)=>{
                            return <SelectQuestionCard quesObj={quesObj} key={index} setSelectedQuestions={setSelectedQuestions} selectedQuestions={selectedQuestions} />
                        })
                    )
                }   
                {
                    selectedQuestions.length>0 ?(
                        <div className='quiz-generate-button'><button className='generate-button' onClick={handleOnClick}>Generate Quiz</button></div>
                    ):(
                        <></>
                    )
                }             
            </div>
            
        </div>
        
    )  
}
export default CreateQuiz;