import React from 'react'
import "./ResultListItem.css"

const ResultListItem = ({result}) => {

const date = new Date(result?.createdAt);
const day = String(date.getDate()).padStart(2, '0'); 
const month = String(date.getMonth() + 1).padStart(2, '0'); 
const year = date.getFullYear(); 


const formatTime = (time) => String(time).padStart(2, '0');



const indianDate = `${day}/${month}/${year}`;
  return (
    <div className='result-list-item'>
        <div className='items'><h3>{result?.username}</h3></div>
        <div className='items'><h3>{indianDate}</h3></div>
        {/* <div className='items'><h3>{date.toLocaleTimeString()}</h3></div> */}
        <div className='items'><h3>{result?.timeTaken ? `${formatTime(Math.floor(result?.timeTaken/3600))}:${formatTime(Math.floor((result?.timeTaken % 3600) / 60))}:${formatTime(result?.timeTaken % 60)}`: `__`}</h3></div>
        <div className='items'><h3>{result?.marks+"/"+result?.totalMarks}</h3></div>
    </div>
  )
}

export default ResultListItem
