import React from 'react';
import { NumberInput, Slider } from '@mantine/core';
import classes from './Slider.module.css';

interface SessionTimeInputProps {
    sessionTime: number;
    setSessionTime: (time: number) => void;
}

const SessionTimeInput: React.FC<SessionTimeInputProps> = ({ sessionTime, setSessionTime }) => {
    return (
        <div className={classes.slideContainer}>
            <label>Session Time
                <Slider
                    classNames={{ label: classes.label }}
                    label={sessionTime}
                    size="xl"
                    min={10}
                    max={60}
                    onChange={(value) => setSessionTime(value as number)}
                />
            </label>
        </div>
    );
}

export default SessionTimeInput;
