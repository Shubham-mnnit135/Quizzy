import React from 'react'
import "./ListItem.css"
import { useNavigate } from 'react-router-dom';


const ListItem2= ({quiz}) => {
  console.log("apna quiz",quiz);
  const date = new Date(quiz?.createdAt);
  const navigate = useNavigate();
  const hour = String(date.getHours()).padStart(2,'0');
  const min = String(date.getMinutes()).padStart(2,'0');
  const sec = String(date.getSeconds()).padStart(2,'0');
  const day = String(date.getDate()).padStart(2, '0'); 
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear(); 

  const indianDate = `${day}/${month}/${year}`;
  const Time = `${hour}:${min}:${sec}`;
  return (
    <div className='list-item' onClick={()=>{ navigate('/protected/resultOfQuiz',{state:{quiz}})}}>
        <div className='item'><h2>{Time}</h2></div>
        <div className='item'><h2>{indianDate}</h2></div>
        <div className="item"><h2>{quiz?._id}</h2></div>
    </div>
  )
}

export default ListItem2
