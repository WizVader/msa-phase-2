import { useState } from 'react';
import { Stepper } from '@mantine/core';

function HabitCheckBox() {
    const [active, setActive] = useState(2);

    return (
        <Stepper active={active} onStepClick={setActive} iconPosition="right">
            <Stepper.Step label="Step 1" description="Create an account" />
            <Stepper.Step label="Step 2" description="Verify email" />
            <Stepper.Step label="Step 3" description="Get full access" />
        </Stepper>
    );
}

export default HabitCheckBox;