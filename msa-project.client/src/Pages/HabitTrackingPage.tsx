import { useState, useEffect } from 'react';
import { Checkbox, Group, Button, TextInput, Text, ActionIcon, Stack, Menu, Card } from '@mantine/core';
import { IconTrashFilled, IconRun, IconBookFilled, IconBedFilled, IconBarbellFilled, IconBallpenFilled } from '@tabler/icons-react';
import classes from './HabitTrackingPage.module.css';
import StatsCard from '../Components/StatsCard';
import AuthorizeView from '../Components/AuthorizeView';
import axios from 'axios';

interface CheckboxItem {
    id: number;
    label: string;
    icon: string; // Change type to string to store icon name
    monthlyCheckIns: number;
    totalCheckIns: number;
    currentStreak: number;
    isCompletedToday: boolean;
}

const iconMap: { [key: string]: React.ReactNode } = {
    run: <IconRun size={16} />,
    study: <IconBookFilled size={16} />,
    sleep: <IconBedFilled size={16} />,
    gym: <IconBarbellFilled size={16} />,
    write: <IconBallpenFilled size={16} />,
};

function HabitTrackingPage() {
    const [checkboxes, setCheckboxes] = useState<CheckboxItem[]>([]);
    const [label, setLabel] = useState<string>('');
    const [selectedIcon, setSelectedIcon] = useState<string>('study'); // Change to string to store icon name
    const [selectedHabit, setSelectedHabit] = useState<CheckboxItem | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [isEmailFetched, setIsEmailFetched] = useState<boolean>(false);

    useEffect(() => {
        // Fetch the user's email and habits from the backend
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/pingauth');
                if (response.data && response.data.email) {
                    setUserEmail(response.data.email);
                    setIsEmailFetched(true);

                    const habitsResponse = await axios.get('/api/habits');
                    const habits = habitsResponse.data.map((habit: any) => ({
                        id: habit.id,
                        label: habit.label,
                        icon: habit.icon,
                        monthlyCheckIns: habit.monthlyCheckIns,
                        totalCheckIns: habit.totalCheckIns,
                        currentStreak: habit.currentStreak,
                        isCompletedToday: habit.isCompletedToday,
                    }));
                    setCheckboxes(habits);
                } else {
                    console.error('No email found in pingauth response');
                }
            } catch (error) {
                console.error('Failed to fetch user data', error);
            }
        };

        fetchUserData();
    }, []);

    const addCheckbox = async () => {
        if (label.trim() && userEmail) {
            const newHabit = {
                label: label.trim(),
                icon: selectedIcon, // Use selectedIcon directly
                userEmail: userEmail
            };

            try {
                const response = await axios.post('/api/habits', newHabit);
                setCheckboxes([...checkboxes, { id: response.data.id, label, icon: selectedIcon, monthlyCheckIns: 0, totalCheckIns: 0, currentStreak: 0, isCompletedToday: false }]);
                setLabel('');
            } catch (error) {
                console.error('Failed to add habit', error);
                if (error.response) {
                    console.log('Backend response:', error.response.data);
                }
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
        }
    };

    const checkInHabit = async (habit: CheckboxItem) => {
        try {
            const response = await axios.post(`/api/habits/${habit.id}/checkin`);
            const updatedHabit = response.data;
            setCheckboxes(checkboxes.map((checkbox) =>
                checkbox.id === habit.id ? {
                    ...checkbox,
                    isCompletedToday: updatedHabit.isCompletedToday,
                    monthlyCheckIns: updatedHabit.monthlyCheckIns,
                    totalCheckIns: updatedHabit.totalCheckIns,
                    currentStreak: updatedHabit.currentStreak,
                    lastCheckInDate: updatedHabit.lastCheckInDate
                } : checkbox
            ));
        } catch (error) {
            console.error('Failed to check in habit', error);
        }
    };

    const iconOptions = [
        { icon: <ActionIcon size="md">{iconMap.run}</ActionIcon>, label: 'Run', value: 'run' },
        { icon: <ActionIcon size="md">{iconMap.study}</ActionIcon>, label: 'Study', value: 'study' },
        { icon: <ActionIcon size="md">{iconMap.sleep}</ActionIcon>, label: 'Sleep', value: 'sleep' },
        { icon: <ActionIcon size="md">{iconMap.gym}</ActionIcon>, label: 'Gym', value: 'gym' },
        { icon: <ActionIcon size="md">{iconMap.write}</ActionIcon>, label: 'Write', value: 'write' },
    ];

    const handleHabitClick = (habit: CheckboxItem) => {
        setSelectedHabit(habit);
    };

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
                            <div>
                                <TextInput
                                    value={label}
                                    onChange={(event) => setLabel(event.currentTarget.value)}
                                    placeholder="Enter habit name"
                                    label="New Habit"
                                    maxLength={20}
                                    disabled={!isEmailFetched} // Disable input until email is fetched
                                />
                                <Menu>
                                    <Menu.Target>
                                        <Button mt="md" className={classes.button} disabled={!isEmailFetched}>Select Icon</Button>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        {iconOptions.map((option, index) => (
                                            <Menu.Item
                                                key={index}
                                                onClick={() => setSelectedIcon(option.value)}
                                            >
                                                {option.icon}
                                            </Menu.Item>
                                        ))}
                                    </Menu.Dropdown>
                                </Menu>
                                <Button onClick={addCheckbox} mt="md" className={classes.button} disabled={!isEmailFetched}>Add Habit</Button>
                            </div>
                            <Stack mt="lg">
                                {checkboxes.map((checkbox) => (
                                    <div key={checkbox.id} onClick={() => handleHabitClick(checkbox)}>
                                        <Card>
                                            <Group className={classes.habitItem}>
                                                <div className={classes.icon}>
                                                    <ActionIcon size="md">{iconMap[checkbox.icon]}</ActionIcon>
                                                </div>
                                                <div className={classes.checkbox}>{checkbox.label}</div>
                                                <Checkbox
                                                    size="lg"
                                                    radius="xl"
                                                    checked={checkbox.isCompletedToday}
                                                    onChange={() => checkInHabit(checkbox)}
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
                            {selectedHabit && (
                                <StatsCard
                                    icon={<ActionIcon size="md">{iconMap[selectedHabit.icon]}</ActionIcon>}
                                    label={selectedHabit.label}
                                    monthlyCheckIns={selectedHabit.monthlyCheckIns}
                                    totalCheckIns={selectedHabit.totalCheckIns}
                                    currentStreak={selectedHabit.currentStreak}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthorizeView>
    );
}

export default HabitTrackingPage;
