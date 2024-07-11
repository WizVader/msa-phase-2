import { useState } from 'react';
import { Text, TextInput, Button, Stack, Card, Group, ActionIcon } from '@mantine/core'
import { IconTrashFilled } from '@tabler/icons-react';
import TasksRichTextEditor from '../Components/TasksRichTextEditor';
import classes from './TaskPage.module.css';

interface TaskItem {
    id: number;
    label: string;

}

function TaskPage() {
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [label, setLabel] = useState<string>('');
    const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);

    const addTask = () => {
        if (label.trim()) {
            setTasks([...tasks, { label, id: Date.now() }]);
            setLabel('');
        }
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id));
        if (selectedTask?.id === id) {
            setSelectedTask(null);
        }
    }

    const handleTaskClick = (task: TaskItem) => {
        setSelectedTask(task);
    }

    return (
        <div className={classes.container}>
            <div className={classes.row}>
                <div className={classes.left}>
                    <div className={classes.leftContainer}>
                        <div>
                            <h1>
                                <Text size="xl">Tasks</Text>
                            </h1>
                        </div>
                        <div>
                            <TextInput
                                value={label}
                                onChange={(event) => setLabel(event.currentTarget.value)}
                                placeholder="Enter task name"
                                label="New Task"
                                maxLength={20}
                            />
                            <Button onClick={addTask} color="blue">Add Task</Button>
                        </div>
                        <Stack mt="lg">
                            {tasks.map((task) => (
                                <div key={task.id} onClick={() => handleTaskClick(task)}>
                                    <Card>
                                        <Group>
                                            <div className={classes.task}>{task.label}</div>
                                            <ActionIcon onClick={(e) => { e.stopPropagation(); deleteTask(task.id) }} color="red" size="md">
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
                    <div className={classes.rightContainer}>
                        {selectedTask && <TasksRichTextEditor heading={selectedTask.label} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskPage;