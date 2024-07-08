import React from 'react';
import { Text, Slider } from '@mantine/core';
import classes from './Slider.module.css';

interface SessionTimeInputProps {
    sessionTime: number;
    setSessionTime: (time: number) => void;
}

const SessionTimeInput: React.FC<SessionTimeInputProps> = ({ sessionTime, setSessionTime }) => {
    return (
        <div className={classes.slideContainer}>
            <Text className={classes.label}>Session Time
                <Slider
                    label={sessionTime}
                    size="xl"
                    min={10}
                    max={60}
                    onChange={(value) => setSessionTime(value as number)}
                />
            </Text>
        </div>
    );
}

export default SessionTimeInput;
