import React, { useState, useEffect, useRef } from 'react';
import { ActionIcon, RingProgress, Title } from '@mantine/core';
import { IconPlayerPauseFilled, IconPlayerPlayFilled, IconRepeat } from '@tabler/icons-react';
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
    const initialSessionTime = 10;
    const initialBreakTime = 5;
    const initialNumberOfSessions = 4;

    const [minutes, setMinutes] = useState<number>(initialSessionTime);
    const [seconds, setSeconds] = useState<number>(0);
    const [sessionTime, setSessionTime] = useState<number>(initialSessionTime);
    const [breakTime, setBreakTime] = useState<number>(initialBreakTime);
    const [numberOfSessions, setNumberOfSessions] = useState<number>(initialNumberOfSessions);
    const [currentSession, setCurrentSession] = useState<number>(1);
    const [isBreak, setIsBreak] = useState<boolean>(false);
    const [isRunning, setIsRunning] = useState<boolean>(false);
    const [motivationalPhrase, setMotivationalPhrase] = useState<string>(getRandomPhrase(motivationalWords));
    const [breakPhrase, setBreakPhrase] = useState<string>(getRandomPhrase(breakPhrases));
    const [hasStarted, setHasStarted] = useState<boolean>(false);
    const [initialTime, setInitialTime] = useState<number>(initialSessionTime * 60);
    const [progressValue, setProgressValue] = useState<number>(0);

    const [sliderSessionTime, setSliderSessionTime] = useState<number>(initialSessionTime);
    const [sliderBreakTime, setSliderBreakTime] = useState<number>(initialBreakTime);

    const isRunningRef = useRef(isRunning);

    useEffect(() => {
        isRunningRef.current = isRunning;
    }, [isRunning]);

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
                            setInitialTime(sessionTime * 60); // Update initial time when starting a new session
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
                setProgressValue(calculatePercentage(minutes, seconds, initialTime));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, seconds, minutes, isBreak, currentSession, numberOfSessions, sessionTime, breakTime]);

    const toggleTimer = () => {
        if (!hasStarted) {
            setMotivationalPhrase(getRandomPhrase(motivationalWords));
            setHasStarted(true);
            setInitialTime(minutes * 60 + seconds); // Set initial time when starting the timer
        }
        setIsRunning(prev => !prev);
    };

    const resetTimer = () => {
        setMinutes(sliderSessionTime);
        setSeconds(0);
        setSessionTime(sliderSessionTime);
        setBreakTime(sliderBreakTime);
        setNumberOfSessions(initialNumberOfSessions);
        setCurrentSession(1);
        setIsBreak(false);
        setIsRunning(false);
        setMotivationalPhrase(getRandomPhrase(motivationalWords));
        setBreakPhrase(getRandomPhrase(breakPhrases));
        setHasStarted(false);
        setInitialTime(sliderSessionTime * 60); // Reset initial time
        setProgressValue(0);
    };

    const calculatePercentage = (minutes: number, seconds: number, initialTime: number) => {
        const totalTimePassed = initialTime - ((minutes * 60) + seconds);
        return (totalTimePassed / initialTime) * 100;
    };

    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

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
                <div className={classes.startButtonWrapper}>
                    <ActionIcon size="xl" radius="xl" onClick={toggleTimer}>
                        {isRunning ? <IconPlayerPauseFilled /> : <IconPlayerPlayFilled />}
                    </ActionIcon>
                    <ActionIcon size="xl" radius="xl" onClick={resetTimer}>
                        <IconRepeat />
                    </ActionIcon>
                </div>
                <div>{hasStarted ? (isBreak ? breakPhrase : `${motivationalPhrase} Session ${currentSession}`) : "Welcome to the Pomodoro Timer!"}</div>
                <div className={classes.sessionInput}>
                    <SessionTimeInput
                        sessionTime={sliderSessionTime}
                        setSessionTime={time => {
                            if (!hasStarted) {
                                setSliderSessionTime(time);
                                setSessionTime(time);
                                setMinutes(time);
                                setInitialTime(time * 60);
                            }
                        }}
                    />
                </div>
                <div className={classes.breakInput}>
                    <BreakTimeInput
                        breakTime={sliderBreakTime}
                        setBreakTime={time => {
                            if (!hasStarted) {
                                setSliderBreakTime(time);
                                setBreakTime(time);
                                if (isBreak) {
                                    setMinutes(time);
                                }
                            }
                        }}
                    />
                </div>
                <div className={classes.numSessionsInput}>
                    <NumberOfSessionsInput
                        numberOfSessions={numberOfSessions}
                        setNumberOfSessions={num => {
                            if (!hasStarted) {
                                setNumberOfSessions(num);
                            }
                        }}
                    />
                </div>
            </section >
        </>
    );
}

export default Timer;
