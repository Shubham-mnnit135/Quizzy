import React, { useEffect, useState } from 'react';
import "./Home.css";
import { TopicCard } from '../../Components/TopicCard/TopicCard';
import {QuestionCard} from '../../Components/QuestionCard/QuestionCard';
import axios from 'axios';
import { ChartsLegend } from '@mui/x-charts/ChartsLegend';

const CreateQuiz = () => {
    const [allQuestion, setAllQuestion] = useState([]);
    const [filteredQuestion, setFilteredQuestion] = useState([]);
    const [topics, setTopics] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState([]);
    useEffect(()=>{
        const fetch = async()=>{
            try {
                const token = localStorage.getItem('token'); // new added lines
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // new added lines
                const res = await axios.get("http://localhost:8000/question/getAllQuestionforPrepration");
                setAllQuestion(res?.data?.allQuestion)
                setFilteredQuestion(res?.data?.allQuestion)
                setTopics(res?.data?.topics)
            } catch (error) {
                if(error.response && error.response.status === 400){
                    console.log(error.response.data.message);
                }
                else{
                    console.log(error.message);
                }
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
                            return <QuestionCard quesObj={quesObj} key={index} />
                        })
                    )
                }                
            </div>
            
        </div>
        
    )  
}
export default CreateQuiz;




// import React, { useEffect, useState } from 'react';
// import "./Home.css";
// import { TopicCard } from '../../Components/TopicCard/TopicCard';
// import {QuestionCard} from '../../Components/QuestionCard/QuestionCard';
// import axios from 'axios';

// const Home = () => {
//     const [allQuestion, setAllQuestion] = useState([]);
//     const [topics, setTopics] = useState([]);
//     useEffect(()=>{
//         const fetch = async()=>{
//             try {
//                 const token = localStorage.getItem('token'); // new added lines
//                 // Set authorization header for Axios requests
//                 axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // new added lines
//                 const res = await axios.get("http://localhost:8000/question/getAllQuestionforPrepration");
//                 // console.log("response ",res);
//                 console.log("response ",res?.data);
//                 setAllQuestion(res?.data?.allQuestion)
//                 setTopics(res?.data?.topics)
//             } catch (error) {
//                 if(error.response && error.response.status === 400){
//                     console.log(error.response.data.message);
//                 }
//                 else{
//                     console.log(error.message);
//                 }
//             }
//         }
//         fetch();
//     },[])

//     return(
//         <div className="home">
//             <div className="topics">
//                 {
//                     topics?.length && (
//                         topics?.map((topic,index)=>{
//                             return <TopicCard key={index} topic={topic}/>
//                         })
//                     )
//                 }                
//             </div>
//             <div className="questions">
//                 {
//                     allQuestion && (
//                         allQuestion?.map((quesObj,index)=>{
//                             return <QuestionCard quesObj={quesObj} key={index}/>
//                         })
//                     )
//                 }                
//             </div>
//         </div>
        
//     )  
// }
// export default Home;