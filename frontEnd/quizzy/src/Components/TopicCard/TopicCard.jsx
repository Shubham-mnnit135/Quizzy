import React from 'react';
import "./TopicCard.css"
export const TopicCard = ({topic,setSelectedTopic}) =>{
    return(
        <div className="topiccard" onClick={() => {setSelectedTopic(topic)}}>
            <p className='topic'>{topic}</p>
        </div>
    )
}