import { Text, Group, Paper, ActionIcon } from '@mantine/core';
import classes from './StatsCard.module.css';
import React from 'react';

interface StatsCardProps {
    icon: React.ReactNode;
    label: string;
    monthlyCheckIns: number;
    totalCheckIns: number;
    currentStreak: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, label, monthlyCheckIns, totalCheckIns, currentStreak }) => {
    return (
        <Paper radius="md" withBorder className={classes.card} mt={20}>
            <Group justify="center" mt="xs">
                <ActionIcon className={classes.icon} size={60} radius={60}>
                    {icon}
                </ActionIcon>
            </Group>
            <Group justify="center" mt="xs">
                <Text ta="center" fw={700} className={classes.title}>
                    {label}
                </Text>
            </Group>
            <Group justify="space-between" mt="xs">
                <Text fz="sm" c="dimmed">
                    Current Streak
                </Text>
                <Text fz="sm" c="dimmed">
                    {currentStreak}
                </Text>
            </Group>
            <Group justify="space-between" mt="xs">
                <Text fz="sm" c="dimmed">
                    Monthly check-ins
                </Text>
                <Text fz="sm" c="dimmed">
                    {monthlyCheckIns}
                </Text>
            </Group>
            <Group justify="space-between" mt="xs">
                <Text fz="sm" c="dimmed">
                    Total check-ins
                </Text>
                <Text fz="sm" c="dimmed">
                    {totalCheckIns}
                </Text>
            </Group>
        </Paper>
    );
}

export default StatsCard;
