import React, { useState, useEffect } from 'react';
import { RingProgress, Text } from '@mantine/core';
import SessionTimeInput from './SessionTimeInput';
import BreakTimeInput from './BreakTimeInput';
import NumberOfSessionsInput from './NumberOfSessionsInput';
import classes from './Slider.module.css'

const Timer: React.FC = () => {
    const [minutes, setMinutes] = useState<number>(10);
    const [seconds, setSeconds] = useState<number>(0);
    const [sessionTime, setSessionTime] = useState<number>(10);
    const [breakTime, setBreakTime] = useState<number>(5);
    const [numberOfSessions, setNumberOfSessions] = useState<number>(4);
    const [currentSession, setCurrentSession] = useState<number>(1);
    const [isBreak, setIsBreak] = useState<boolean>(false);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [initialSessionTime, setInitialSessionTime] = useState<number>(10);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRunning) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        if (isBreak) {
                            setIsBreak(false);
                            setMinutes(sessionTime);
                            setInitialSessionTime(sessionTime);
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
        setInitialSessionTime(sessionTime);
    };

    const calculatePercentage = (minutes: number, seconds: number, initialSessionTime: number) => {
        const totalTimePassed = (minutes * 60) + seconds;
        const totalSessionTimeInSeconds = initialSessionTime * 60;
        return (totalTimePassed / totalSessionTimeInSeconds) * 100;
    };

    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const progressValue = isRunning ? calculatePercentage(minutes, seconds, initialSessionTime) : 0;

    return (
        <>
            <section className={classes.pomoWrapper}>
                <div>
                    <RingProgress
                        sections={[{ value: progressValue, color: 'blue' }]}
                        label={<Text c="blue" fw={800} ta="center" size="xl">{timerMinutes}:{timerSeconds}</Text>}
                        size={200}
                    />
                </div>
                <div className={classes.startButton}><button onClick={startTimer}>Start</button></div>
                <div>{isBreak ? "Break Time" : `Session ${currentSession}`}</div>
                <div className={classes.sessionInput}><SessionTimeInput sessionTime={sessionTime} setSessionTime={setSessionTime} /></div>
                <div className={classes.breakInput}><BreakTimeInput breakTime={breakTime} setBreakTime={setBreakTime} /></div>
                <div className={classes.numSessionsInput}><NumberOfSessionsInput numberOfSessions={numberOfSessions} setNumberOfSessions={setNumberOfSessions} /></div>
            </section >
        </>
    );
}

export default Timer;
