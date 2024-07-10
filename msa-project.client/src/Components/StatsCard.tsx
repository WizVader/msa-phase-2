import { ThemeIcon, Progress, Text, Group, Badge, Paper, rem } from '@mantine/core';
import { IconSwimming } from '@tabler/icons-react';
import classes from './StatsCard.module.css';

function StatsCard() {
    return (
        <Paper radius="md" withBorder className={classes.card} mt={20}>
            <ThemeIcon className={classes.icon} size={60} radius={60}>
                <IconSwimming style={{ width: rem(32), height: rem(32) }} stroke={1.5} />
            </ThemeIcon>

            <Text ta="center" fw={700} className={classes.title}>
                Swimming challenge
            </Text>
            <Text c="dimmed" ta="center" fz="sm">
                32 km / week
            </Text>

            <Group justify="space-between" mt="xs">
                <Text fz="sm" c="dimmed">
                    Current Streak
                </Text>
                <Text fz="sm" c="dimmed">
                    62%
                </Text>
            </Group>

            <Group justify="space-between" mt="md">
                <Text fz="sm">20 / 36 km</Text>
                <Badge size="sm">4 days left</Badge>
            </Group>
        </Paper>
    );
}

export default StatsCard;