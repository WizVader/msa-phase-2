import React from 'react';

interface NumberOfSessionsInputProps {
    numberOfSessions: number;
    setNumberOfSessions: (sessions: number) => void;
}

const NumberOfSessionsInput: React.FC<NumberOfSessionsInputProps> = ({ numberOfSessions, setNumberOfSessions }) => {
    return (
        <div>
            <label>Number of Sessions:
                <input
                    type="number"
                    value={numberOfSessions}
                    onChange={(e) => setNumberOfSessions(Number(e.target.value))}
                />
            </label>
        </div>
    );
}

export default NumberOfSessionsInput;
