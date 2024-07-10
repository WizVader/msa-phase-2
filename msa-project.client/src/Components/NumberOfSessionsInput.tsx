import React from 'react';
import { Slider } from '@mantine/core';
import classes from './Slider.module.css';
interface NumberOfSessionsInputProps {
    numberOfSessions: number;
    setNumberOfSessions: (sessions: number) => void;
}

const NumberOfSessionsInput: React.FC<NumberOfSessionsInputProps> = ({ numberOfSessions, setNumberOfSessions }) => {
    return (
        <div className={classes.slideContainer} >
            <label> Number of Sessions
                <Slider
                    classNames={{ label: classes.label }}
                    size="xl"
                    label={numberOfSessions}
                    min={1}
                    max={10}
                    onChange={(value) => setNumberOfSessions(value as number)}
                />
            </label>
        </div>
    );
}

export default NumberOfSessionsInput;
