import { useState } from 'react';
import { Checkbox, Group, Button, TextInput, Text, ActionIcon, Stack, Menu } from '@mantine/core';
import { IconTrashFilled, IconRun, IconBookFilled, IconBedFilled, IconBarbellFilled, IconBallpenFilled } from '@tabler/icons-react';
import classes from './HabitTrackingPage.module.css';
import StatsCard from '../Components/StatsCard';

interface CheckboxItem {
    id: number;
    label: string;
    icon: React.ReactNode;
}

function HabitTrackingPage() {
    const [checkboxes, setCheckboxes] = useState<CheckboxItem[]>([]);
    const [label, setLabel] = useState<string>('');
    const [selectedIcon, setSelectedIcon] = useState<React.ReactNode>(<ActionIcon size="md"><IconBookFilled size={16} /></ActionIcon>);
    const [selectedHabit, setSelectedHabit] = useState<CheckboxItem | null>(null);

    const addCheckbox = () => {
        if (label.trim()) {
            setCheckboxes([...checkboxes, { label, id: Date.now(), icon: selectedIcon }]);
            setLabel('');
        }
    };

    const deleteCheckbox = (id: number) => {
        setCheckboxes(checkboxes.filter((checkbox) => checkbox.id !== id));
        if (selectedHabit?.id === id) {
            setSelectedHabit(null);
        }
    };

    const iconOptions = [
        { icon: <ActionIcon size="md"><IconRun size={16} /></ActionIcon>, label: 'Run' },
        { icon: <ActionIcon size="md"><IconBookFilled size={16} /></ActionIcon>, label: 'Study' },
        { icon: <ActionIcon size="md"><IconBedFilled size={16} /></ActionIcon>, label: 'Sleep' },
        { icon: <ActionIcon size="md"><IconBarbellFilled size={16} /></ActionIcon>, label: 'Gym' },
        { icon: <ActionIcon size="md"><IconBallpenFilled size={16} /></ActionIcon>, label: 'Write' },
    ];

    const handleHabitClick = (habit: CheckboxItem) => {
        setSelectedHabit(habit);
    };

    return (
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
                                            {option.icon}
                                        </Menu.Item>
                                    ))}
                                </Menu.Dropdown>
                            </Menu>
                            <Button onClick={addCheckbox} mt="md" className={classes.button}>Add Habit</Button>
                        </div>
                        <Stack mt="lg">
                            {checkboxes.map((checkbox) => (
                                <div key={checkbox.id} onClick={() => handleHabitClick(checkbox)}>
                                    <Group className={classes.habitItem}>
                                        <div className={classes.icon}>{checkbox.icon}</div>
                                        <div className={classes.checkbox}>{checkbox.label}</div>
                                        <Checkbox size="lg" radius="xl" />
                                        <ActionIcon color="red" onClick={(e) => { e.stopPropagation(); deleteCheckbox(checkbox.id); }} size="md">
                                            <IconTrashFilled size={16} />
                                        </ActionIcon>
                                    </Group>
                                </div>
                            ))}
                        </Stack>
                    </div>
                </div>
                <div className={classes.right}>
                    <div className={classes.rightcontainer}>
                        {selectedHabit && <StatsCard icon={selectedHabit.icon} label={selectedHabit.label} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HabitTrackingPage;
