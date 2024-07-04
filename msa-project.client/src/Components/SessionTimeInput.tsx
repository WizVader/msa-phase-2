import React from 'react';

interface SessionTimeInputProps {
    sessionTime: number;
    setSessionTime: (time: number) => void;
}

const SessionTimeInput: React.FC<SessionTimeInputProps> = ({ sessionTime, setSessionTime }) => {
    return (
        <div>
            <label>Session Time:
                <input
                    type="number"
                    value={sessionTime}
                    onChange={(e) => setSessionTime(Number(e.target.value))}
                />
            </label>
        </div>
    );
}

export default SessionTimeInput;
