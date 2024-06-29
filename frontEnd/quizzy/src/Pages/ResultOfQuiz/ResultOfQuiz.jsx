import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import "./ResultOfQuiz.css"
import ResultListItem from '../../Components/ResultListItem/ResultListItem';
import { toast } from 'react-toastify';

import { TbArrowsSort } from "react-icons/tb";

const ResultOfQuiz = () => {
  const {state} = useLocation();
  const [resultList,setResultList] = useState([]);
  useEffect(()=>{
     const fetch = async() =>{
        try {
            const token = localStorage.getItem('token'); 
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const res = await axios.post("http://localhost:8000/studentRecord/resultOfQuiz",{quizID:state?.quiz?._id});
            setResultList(res?.data?.list);
        } catch (error) {
          if(error?.response && error?.response?.status===400)
             toast.error(error?.response?.data?.message);
          else
             toast.error(error.message);
        }
     }
     fetch();
  },[])


  const downloadPDF = () => {
   const doc = new jsPDF();

   doc.text('Quiz Results', 14, 20);

   const tableColumn = ["Name", "Date", "Duration", "Marks","Total Marks"];
   const tableRows = [];
   const formatTime = (time) => String(time).padStart(2, '0');

   resultList.forEach(result => {
     const resultData = [
       result?.username,
       new Date(result?.createdAt).toLocaleDateString(),
       result?.timeTaken ? `${formatTime(Math.floor(result?.timeTaken/3600))}:${formatTime(Math.floor((result?.timeTaken % 3600) / 60))}:${formatTime(result?.timeTaken % 60)}`: `__`,
       result?.marks,
       result?.totalMarks
     ];
     tableRows.push(resultData);
   });

   doc.autoTable(tableColumn, tableRows, { startY: 30 });

   doc.save('quiz_results.pdf');
 };
 const sortbyName = () => {
   const sortedList = [...resultList].sort((a, b) => a.username.localeCompare(b.username));
   setResultList(sortedList);
 }

 const sortbyTime = () => {
   const sortedList = [...resultList].sort((a, b) => a.timeTaken- b.timeTaken);
   setResultList(sortedList);
 }

 const sortbyMarks = () => {
   const sortedList = [...resultList].sort((a, b) => a.marks-b.marks);
   setResultList(sortedList);
}

  return (
    <div className='result-list-container'>
       <div className='result-list-box'>
          <div className='list-box-header'>
            <div className='list-box-header-item'><h3>Name <TbArrowsSort onClick={sortbyName} className='sorting-button'/></h3></div>
            <div className='list-box-header-item'><h3>Date</h3></div>
            {/* <div className='list-box-header-item'><h3>Time</h3></div> */}
            <div className='list-box-header-item'><h3>Duration <TbArrowsSort onClick={sortbyTime} className='sorting-button'/></h3></div>
            <div className='list-box-header-item'><h3>Marks <TbArrowsSort onClick={sortbyMarks} className='sorting-button'/></h3></div>
          </div>
          <div className='list-box-data'>
            {
                resultList?.length && (
                        resultList?.map((result,index)=>{
                            return <ResultListItem key={index} result={result}  />
                        })
                    )
            }
          </div>
       </div>
       <button onClick={downloadPDF} className='download-pdf-button'>Download Pdf</button>
    </div>
  )
}

export default ResultOfQuiz
