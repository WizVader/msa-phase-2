import React, { useState, useEffect } from 'react';
import { ActionIcon, RingProgress, Text, Title } from '@mantine/core';
import { IconPlayerPauseFilled, IconPlayerPlayFilled } from '@tabler/icons-react';
import SessionTimeInput from './SessionTimeInput';
import BreakTimeInput from './BreakTimeInput';
import NumberOfSessionsInput from './NumberOfSessionsInput';
import classes from './Slider.module.css';

const motivationalWords = [
    "Keep going!", "You got this!", "Stay focused!", "Almost there!", "Great job!", "Keep pushing!"
];

const breakPhrases = [
    "Time to relax!", "Take a deep breath.", "Stretch a little.", "You've earned a break!", "Rest and recharge."
];

const getRandomPhrase = (phrases: string[]) => phrases[Math.floor(Math.random() * phrases.length)];

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
    const [motivationalPhrase, setMotivationalPhrase] = useState<string>(getRandomPhrase(motivationalWords));
    const [breakPhrase, setBreakPhrase] = useState<string>(getRandomPhrase(breakPhrases));
    const [hasStarted, setHasStarted] = useState<boolean>(false);

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
                            setBreakPhrase(getRandomPhrase(breakPhrases));
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

    const toggleTimer = () => {
        if (!hasStarted) {
            setMotivationalPhrase(getRandomPhrase(motivationalWords));
            setHasStarted(true);
        }
        setIsRunning(prev => !prev);
    };

    const calculatePercentage = (minutes: number, seconds: number, initialSessionTime: number) => {
        const totalTimePassed = (initialSessionTime * 60) - ((minutes * 60) + seconds);
        const totalSessionTimeInSeconds = initialSessionTime * 60;
        return (totalTimePassed / totalSessionTimeInSeconds) * 100;
    };

    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const progressValue = calculatePercentage(minutes, seconds, initialSessionTime);

    return (
        <>
            <section className={classes.pomoWrapper}>
                <div>
                    <RingProgress
                        sections={[{ value: progressValue, color: 'blue' }]}
                        label={<Title order={1} c="blue" fw={800} ta="center">{timerMinutes}:{timerSeconds}</Title>}
                        size={220}
                    />
                </div>
                <div className={classes.startButton}>
                    {/*<ActionIcon variant="gradient" size="xl" radius="xl" gradient={{ from: 'blue', to: 'cyan', deg: 90 }} onClick={toggleTimer}>*/}
                    <ActionIcon size="xl" radius="xl" onClick={toggleTimer}>
                        {isRunning ? <IconPlayerPauseFilled /> : <IconPlayerPlayFilled />}
                    </ActionIcon>
                </div>
                <div>{hasStarted ? (isBreak ? breakPhrase : `${motivationalPhrase} Session ${currentSession}`) : "Welcome to the Pomodoro Timer!"}</div>
                <div className={classes.sessionInput}><SessionTimeInput sessionTime={sessionTime} setSessionTime={setSessionTime} /></div>
                <div className={classes.breakInput}><BreakTimeInput breakTime={breakTime} setBreakTime={setBreakTime} /></div>
                <div className={classes.numSessionsInput}><NumberOfSessionsInput numberOfSessions={numberOfSessions} setNumberOfSessions={setNumberOfSessions} /></div>
            </section >
        </>
    );
}

export default Timer;
