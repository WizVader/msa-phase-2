import React from 'react';
import { NumberInput } from '@mantine/core';
import classes from './NumberOfSessionsInput.module.css';
interface NumberOfSessionsInputProps {
    numberOfSessions: number;
    setNumberOfSessions: (sessions: number) => void;
}

const NumberOfSessionsInput: React.FC<NumberOfSessionsInputProps> = ({ numberOfSessions, setNumberOfSessions }) => {
    return (
        <div >
            <NumberInput
                classNames={{ root: classes.root, label: classes.label }}
                value={numberOfSessions}
                label="Number of Sessions: "
                onChange={(value) => setNumberOfSessions(value as number)}
            />
        </div>
    );
}

export default NumberOfSessionsInput;
