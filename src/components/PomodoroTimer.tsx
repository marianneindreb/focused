import React, { useState, useEffect } from 'react';

const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

const PomodoroTimer: React.FC = () => {
  const [time, setTime] = useState<number>(WORK_TIME);
  const [isWorkInterval, setIsWorkInterval] = useState<boolean>(true);
  const [timerOn, setTimerOn] = useState<boolean>(false);

  useEffect(() => {
    let interval: number | null = null;

    if (timerOn && time > 0) {
      interval = window.setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time <= 0) {
      clearInterval(interval!);
      setIsWorkInterval((prev) => !prev);
      setTime(isWorkInterval ? BREAK_TIME : WORK_TIME);
      if (!isWorkInterval) {
        time <= 0;
        setTimerOn(false);
      } else {
        setTimerOn(true);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerOn, time, isWorkInterval]);

  const toggleTimer = () => {
    if (timerOn) {
      setTime(WORK_TIME);
      setIsWorkInterval(true);
      setTimerOn(false);
    } else {
      setTime(isWorkInterval ? WORK_TIME : BREAK_TIME);
      setTimerOn(true);
    }
  };

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0` : ''}${seconds}`;
  };

  const progressPercentage = (time / (isWorkInterval ? WORK_TIME : BREAK_TIME)) * 100;
  const strokeDashoffset = 283 * (progressPercentage / 100);

  return (
    <div
      className={`pomodoro-container widget-container ${isWorkInterval ? 'work-mode' : 'break-mode'}`}>
      <div className="timer-progress">
        <svg className="circle-timer" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            className="circle-background"
            style={{
              strokeDashoffset,
              stroke: !isWorkInterval ? '#242424' : '#d9d9d9',
            }}></circle>
          <circle
            cx="50"
            cy="50"
            r="45"
            className="circle-progress"
            style={{
              strokeDashoffset,
              stroke: isWorkInterval ? '#242424' : '#d9d9d9',
            }}></circle>
          <text className="timer" x="50" y="50" textAnchor="middle" dy=".3em">
            {formatTime()}
          </text>
        </svg>
      </div>
      <div className="button-wrapper">
        <p>{isWorkInterval ? 'Time to focus.' : 'Break time!'}</p>
        <button onClick={toggleTimer}>{timerOn ? 'Reset' : 'Start'}</button>
      </div>
    </div>
  );
};

export { PomodoroTimer };
