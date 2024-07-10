import { ThemeIcon, Text, Group, Paper } from '@mantine/core';
import classes from './StatsCard.module.css';
import React from 'react';

interface StatsCardProps {
    icon: React.ReactNode;
    label: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, label }) => {
    return (
        <Paper radius="md" withBorder className={classes.card} mt={20}>
            <ThemeIcon className={classes.icon} size={60} radius={60}>
                {icon}
            </ThemeIcon>

            <Text ta="center" fw={700} className={classes.title}>
                {label}
            </Text>

            <Group justify="space-between" mt="xs">
                <Text fz="sm" c="dimmed">
                    Current Streak
                </Text>
                <Text fz="sm" c="dimmed">
                    0
                </Text>
            </Group>
            <Group justify="space-between" mt="xs">
                <Text fz="sm" c="dimmed">
                    Monthly check-ins
                </Text>
                <Text fz="sm" c="dimmed">
                    0
                </Text>
            </Group>
            <Group justify="space-between" mt="xs">
                <Text fz="sm" c="dimmed">
                    Total check-ins
                </Text>
                <Text fz="sm" c="dimmed">
                    0
                </Text>
            </Group>
        </Paper>
    );
}

export default StatsCard;
