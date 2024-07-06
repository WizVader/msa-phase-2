import React from 'react';
import { Slider } from '@mantine/core';
import classes from './Slider.module.css';

interface BreakTimeInputProps {
    breakTime: number;
    setBreakTime: (time: number) => void;
}

const BreakTimeInput: React.FC<BreakTimeInputProps> = ({ breakTime, setBreakTime }) => {
    return (
        <div className={classes.slideContainer}>
            <label>Break Time
                <Slider
                    label={breakTime}
                    min={5}
                    size="xl"
                    max={25}
                    onChange={(value) => setBreakTime(value as number)}
                />
            </label>
        </div>
    );
}

export default BreakTimeInput;
