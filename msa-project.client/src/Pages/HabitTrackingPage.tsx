import { useState, useEffect } from 'react';
import { Checkbox, Group, Button, TextInput, Text, ActionIcon, Stack, Menu, Card, Notification } from '@mantine/core';
import { IconTrashFilled, IconRun, IconBookFilled, IconBedFilled, IconBarbellFilled, IconBallpenFilled } from '@tabler/icons-react';
import axios from 'axios';
import classes from './HabitTrackingPage.module.css';
import StatsCard from '../Components/StatsCard';
import AuthorizeView from '../Components/AuthorizeView';

interface CheckboxItem {
    id: number;
    label: string;
    icon: string;
    isCompletedToday: boolean;
}

const iconMapping = {
    run: <IconRun size={16} />,
    study: <IconBookFilled size={16} />,
    sleep: <IconBedFilled size={16} />,
    gym: <IconBarbellFilled size={16} />,
    write: <IconBallpenFilled size={16} />,
};

function HabitTrackingPage() {
    const [checkboxes, setCheckboxes] = useState<CheckboxItem[]>([]);
    const [label, setLabel] = useState<string>('');
    const [selectedIcon, setSelectedIcon] = useState<string>('study');
    const [selectedHabit, setSelectedHabit] = useState<CheckboxItem | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch habits from the server when the component mounts
        const fetchHabits = async () => {
            try {
                const response = await axios.get('/api/habits');
                const habits = response.data.map((habit: any) => ({
                    ...habit,
                    icon: iconMapping[habit.icon]
                }));
                setCheckboxes(habits);
            } catch (error) {
                console.error('Failed to fetch habits', error);
                setError('Failed to fetch habits');
            }
        };

        fetchHabits();
    }, []);

    const addCheckbox = async () => {
        if (label.trim()) {
            const newHabit = { label, icon: selectedIcon };
            console.log('Sending new habit:', newHabit);
            try {
                const response = await axios.post('/api/habits', newHabit);
                const addedHabit = {
                    ...response.data,
                    icon: iconMapping[response.data.icon],
                };
                setCheckboxes([...checkboxes, addedHabit]);
                setLabel('');
                setSelectedIcon('study'); // Reset to default icon
            } catch (error) {
                console.error('Failed to add habit', error);
                if (error.response) {
                    console.error('Backend response:', error.response.data);
                }
                setError('Failed to add habit');
            }
        }
    };

    const deleteCheckbox = async (id: number) => {
        try {
            await axios.delete(`/api/habits/${id}`);
            setCheckboxes(checkboxes.filter((checkbox) => checkbox.id !== id));
            if (selectedHabit?.id === id) {
                setSelectedHabit(null);
            }
        } catch (error) {
            console.error('Failed to delete habit', error);
            setError('Failed to delete habit');
        }
    };

    const handleHabitClick = (habit: CheckboxItem) => {
        setSelectedHabit(habit);
    };

    const handleCheckIn = async (id: number) => {
        try {
            await axios.post(`/api/habits/${id}/checkin`);
            setCheckboxes(checkboxes.map((checkbox) =>
                checkbox.id === id ? { ...checkbox, isCompletedToday: true } : checkbox
            ));
        } catch (error) {
            console.error('Failed to check in habit', error);
            setError('Failed to check in habit');
        }
    };

    const iconOptions = [
        { icon: 'run', label: 'Run' },
        { icon: 'study', label: 'Study' },
        { icon: 'sleep', label: 'Sleep' },
        { icon: 'gym', label: 'Gym' },
        { icon: 'write', label: 'Write' },
    ];

    return (
        <AuthorizeView>
            <div className={classes.container}>
                <div className={classes.row}>
                    <div className={classes.left}>
                        <div className={classes.leftcontainer}>
                            <div>
                                <h1>
                                    <Text size="xl">Habit Tracking</Text>
                                </h1>
                            </div>
                            {error && <Notification color="red">{error}</Notification>}
                            <div>
                                <TextInput
                                    value={label}
                                    onChange={(event) => setLabel(event.currentTarget.value)}
                                    placeholder="Enter habit name"
                                    label="New Habit"
                                    maxLength={20}
                                />
                                <Menu>
                                    <Menu.Target>
                                        <Button mt="md" className={classes.button}>Select Icon</Button>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        {iconOptions.map((option, index) => (
                                            <Menu.Item
                                                key={index}
                                                onClick={() => setSelectedIcon(option.icon)}
                                            >
                                                <ActionIcon size="md">{iconMapping[option.icon]}</ActionIcon>
                                            </Menu.Item>
                                        ))}
                                    </Menu.Dropdown>
                                </Menu>
                                <Button onClick={addCheckbox} mt="md" className={classes.button}>Add Habit</Button>
                            </div>
                            <Stack mt="lg">
                                {checkboxes.map((checkbox) => (
                                    <div key={checkbox.id} onClick={() => handleHabitClick(checkbox)}>
                                        <Card>
                                            <Group className={classes.habitItem}>
                                                <div className={classes.icon}>{iconMapping[checkbox.icon]}</div>
                                                <div className={classes.checkbox}>{checkbox.label}</div>
                                                <Checkbox
                                                    size="lg"
                                                    radius="xl"
                                                    checked={checkbox.isCompletedToday}
                                                    onChange={() => handleCheckIn(checkbox.id)}
                                                />
                                                <ActionIcon color="red" onClick={(e) => { e.stopPropagation(); deleteCheckbox(checkbox.id); }} size="md">
                                                    <IconTrashFilled size={16} />
                                                </ActionIcon>
                                            </Group>
                                        </Card>
                                    </div>
                                ))}
                            </Stack>
                        </div>
                    </div>
                    <div className={classes.right}>
                        <div className={classes.rightcontainer}>
                            {selectedHabit && <StatsCard icon={iconMapping[selectedHabit.icon]} label={selectedHabit.label} />}
                        </div>
                    </div>
                </div>
            </div>
        </AuthorizeView>
    );
}

export default HabitTrackingPage;
