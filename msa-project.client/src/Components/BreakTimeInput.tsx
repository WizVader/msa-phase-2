import React from 'react';
import { NumberInput } from '@mantine/core';

interface BreakTimeInputProps {
    breakTime: number;
    setBreakTime: (time: number) => void;
}

const BreakTimeInput: React.FC<BreakTimeInputProps> = ({ breakTime, setBreakTime }) => {
    return (
        <div>
            <label>Break Time:
                <NumberInput
                    value={breakTime}
                    onChange={(value) => setBreakTime(value as number)}
                />
            </label>
        </div>
    );
}

export default BreakTimeInput;
