import { ActionIcon, RingProgress, Text, Center, rem } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

function Demo() {
    return (
        <>
            <RingProgress
                sections={[{ value: 50, color: 'blue', max: 50 }]}
                label={
                    <Text c="blue" fw={700} ta="center" size="xl">
                        40%
                    </Text>
                }
            />
        </>
    );
}

export default Demo;