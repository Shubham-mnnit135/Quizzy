import React, { useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import "./Timer.css"
function Timer({ expiryTimestamp,handleTimerComplete,setElapsedTime }) {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    isRunning
  } = useTimer({ expiryTimestamp, onExpire: () => {handleTimerComplete()}});

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setElapsedTime(totalSeconds);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [ isRunning,totalSeconds, setElapsedTime]);

  const formatTime = (time) => String(time).padStart(2, '0');
  
  return (
    <div className='Timer-box'>
        <span>{formatTime(hours)}</span>:<span>{formatTime(minutes)}</span>:<span>{formatTime(seconds)}</span>
    </div>
  );
}

export default Timer;