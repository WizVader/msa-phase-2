import { useState } from 'react';
import { Text, TextInput, Button, Stack, Card, Group, ActionIcon } from '@mantine/core';
import { IconTrashFilled } from '@tabler/icons-react';
import { useEditor } from '@tiptap/react';
import { Link } from '@tiptap/extension-link';
import TasksRichTextEditor from '../Components/TasksRichTextEditor';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import classes from './TaskPage.module.css';

interface TaskItem {
    id: number;
    label: string;
}

function TaskPage() {
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [label, setLabel] = useState<string>('');
    const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
        ],
        content: '',
    });

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
        if (editor) {
            const content = `<h2 style="text-align: center;">${task.label}</h2>`;
            editor.commands.setContent(content);
        }
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
                            <Button onClick={addTask} className={classes.button} color="blue">Add Task</Button>
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
                        {selectedTask && <TasksRichTextEditor editor={editor} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaskPage;
