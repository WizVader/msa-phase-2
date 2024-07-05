import React from 'react';
import { NumberInput } from '@mantine/core';

interface SessionTimeInputProps {
    sessionTime: number;
    setSessionTime: (time: number) => void;
}

const SessionTimeInput: React.FC<SessionTimeInputProps> = ({ sessionTime, setSessionTime }) => {
    return (
        <div>
            <label>Session Time:
                <NumberInput
                    value={sessionTime}
                    onChange={(value) => setSessionTime(value as number)}
                />
            </label>
        </div>
    );
}

export default SessionTimeInput;
