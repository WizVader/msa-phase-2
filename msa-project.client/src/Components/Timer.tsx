import React, { useState, useEffect } from 'react';
import SessionTimeInput from './SessionTimeInput';
import BreakTimeInput from './BreakTimeInput';
import NumberOfSessionsInput from './NumberOfSessionsInput';

const Timer: React.FC = () => {
    const [minutes, setMinutes] = useState<number>(25);
    const [seconds, setSeconds] = useState<number>(0);
    const [sessionTime, setSessionTime] = useState<number>(25);
    const [breakTime, setBreakTime] = useState<number>(5);
    const [numberOfSessions, setNumberOfSessions] = useState<number>(4);
    const [currentSession, setCurrentSession] = useState<number>(1);
    const [isBreak, setIsBreak] = useState<boolean>(false);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        if (isBreak) {
                            setIsBreak(false);
                            setMinutes(sessionTime);
                            setCurrentSession(prev => prev + 1);
                            if (currentSession >= numberOfSessions) {
                                clearInterval(interval);
                                alert("Pomodoro sessions complete!");
                                setIsRunning(false);
                            }
                        } else {
                            setIsBreak(true);
                            setMinutes(breakTime);
                        }
                        setSeconds(0);
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, seconds, minutes, isBreak, currentSession, numberOfSessions, sessionTime, breakTime]);

    const startTimer = () => {
        setMinutes(sessionTime);
        setSeconds(0);
        setCurrentSession(1);
        setIsBreak(false);
        setIsRunning(true);
    };

    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return (
        <div>
            <SessionTimeInput sessionTime={sessionTime} setSessionTime={setSessionTime} />
            <BreakTimeInput breakTime={breakTime} setBreakTime={setBreakTime} />
            <NumberOfSessionsInput numberOfSessions={numberOfSessions} setNumberOfSessions={setNumberOfSessions} />
            <button onClick={startTimer}>Start</button>
            <div className='timer'>{timerMinutes}:{timerSeconds}</div>
            <div>{isBreak ? "Break Time" : `Session ${currentSession}`}</div>
        </div>
    );
}

export default Timer;
