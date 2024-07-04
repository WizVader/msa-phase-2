import React from 'react';

interface BreakTimeInputProps {
    breakTime: number;
    setBreakTime: (time: number) => void;
}

const BreakTimeInput: React.FC<BreakTimeInputProps> = ({ breakTime, setBreakTime }) => {
    return (
        <div>
            <label>Break Time:
                <input
                    type="number"
                    value={breakTime}
                    onChange={(e) => setBreakTime(Number(e.target.value))}
                />
            </label>
        </div>
    );
}

export default BreakTimeInput;
