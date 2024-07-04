import React, { useState, useEffect } from 'react';

function Timer() {

    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let interval = setInterval(() => {
            clearInterval(interval)

            if (seconds === 0) {
                if (minutes !== 0) {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
                else {
                    //
                }

            }

            else {
                setSeconds(seconds - 1);
            }
        }, 1000)
    }, [seconds])

    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return (
        <div className='timer'>{timerMinutes}:{timerSeconds}</div>
    );
}

export default Timer;