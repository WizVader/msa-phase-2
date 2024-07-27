import { useState, useEffect } from 'react';
import { Text, TextInput, Button, Stack, Card, Group, ActionIcon, Divider } from '@mantine/core';
import { IconTrashFilled } from '@tabler/icons-react';
import { useEditor } from '@tiptap/react';
import TasksRichTextEditor from '../Components/TasksRichTextEditor';
import { Link, getTaskListExtension } from '@mantine/tiptap';
import Highlight from '@tiptap/extension-highlight';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Superscript from '@tiptap/extension-superscript';
import SubScript from '@tiptap/extension-subscript';
import Placeholder from '@tiptap/extension-placeholder';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import classes from './TaskPage.module.css';
import AuthorizeView from '../Components/AuthorizeView';
import axios from 'axios';

interface TaskItem {
    id: number;
    label: string;
    content: string;
}

function TaskPage() {
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [label, setLabel] = useState<string>('');
    const [selectedTask, setSelectedTask] = useState<TaskItem | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('/pingauth');
                if (response.data && response.data.email) {
                    setUserEmail(response.data.email);

                    const tasksResponse = await axios.get('/api/Tasks');
                    console.log('Tasks Response:', tasksResponse.data);
                    if (Array.isArray(tasksResponse.data)) {
                        const tasks = tasksResponse.data.map((task: any) => ({
                            id: task.id,
                            label: task.label,
                            content: task.content,
                        }));
                        setTasks(tasks);
                    } else {
                        console.error('Tasks response data is not an array');
                    }
                } else {
                    console.error('No email found in response data');
                }
            } catch (error) {
                console.error('Error fetching user data', error);
            }
        };
        fetchUserData();
    }, []);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            SubScript,
            Highlight,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Placeholder.configure({ placeholder: 'Start typing your task content here...' }),
            getTaskListExtension(TaskList),
            TaskItem.configure({ nested: true }),
        ],
        content: '',
    });

    const addTask = async () => {
        if (label.trim()) {
            const newTask = {
                label,
                content: `
                    <h2 style="text-align: center;">Insert Task Name here</h2>
                    <p>
                        <code>RichTextEditor</code> component focuses on usability and is designed to be as simple as possible to bring a familiar editing experience to regular users. <code>RichTextEditor</code> is based on
                        <a href="https://tiptap.dev/" rel="noopener noreferrer" target="_blank">Tiptap.dev</a> and supports all of its features:
                    </p>
                    <ul>
                        <li>General text formatting: <strong>bold</strong>, <em>italic</em>, <u>underline</u>, <s>strike-through</s></li>
                        <li>Headings (h1-h6)</li>
                        <li>Sub and super scripts (<sup>&lt;sup /&gt;</sup> and <sub>&lt;sub /&gt;</sub>)</li>
                        <li>Ordered and bullet lists</li>
                        <li>Text align</li>
                        <li>And all other <a href="https://tiptap.dev/extensions" target="_blank" rel="noopener noreferrer">extensions</a></li>
                    </ul>
                    <ul data-type="taskList">
                        <li data-type="taskItem" data-checked="false">Exammple fix</li>
                    </ul>
                `,
                userEmail,
            };
            try {
                const response = await axios.post('/api/Tasks', newTask);
                setTasks([...tasks, response.data]);
                setLabel('');
            } catch (error) {
                console.error('Error adding task', error);
            }
        }
    };

    const deleteTask = async (id: number) => {
        try {
            await axios.delete(`/api/Tasks/${id}`);
            setTasks(tasks.filter((task) => task.id !== id));
            if (selectedTask?.id === id) {
                setSelectedTask(null);
            }
        } catch (error) {
            console.error('Error deleting task', error);
        }
    };

    const handleTaskClick = (task: TaskItem) => {
        setSelectedTask(task);
        if (editor) {
            editor.commands.setContent(task.content);
        }
    };

    const saveTaskContent = async () => {
        if (selectedTask && editor) {
            const updatedContent = editor.getHTML();
            const updatedTasks = tasks.map((task) =>
                task.id === selectedTask.id ? { ...task, content: updatedContent } : task
            );
            setTasks(updatedTasks);

            try {
                await axios.put(`/api/Tasks/${selectedTask.id}`, {
                    ...selectedTask,
                    content: updatedContent,
                    userEmail: userEmail
                });
            } catch (error) {
                console.error('Error saving task content', error);
            }
        }
    };

    return (
        <AuthorizeView>
            <div className={classes.container}>
                <div className={classes.row}>
                    <div className={classes.left}>
                        <div className={classes.leftContainer}>
                            <div>
                                <h1>
                                    <Text size="xl">Tasks</Text>
                                </h1>
                                <Text size="sm">Manage your tasks here</Text>
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
                    <Divider orientation="vertical" />
                    <div className={classes.right}>
                        <div className={classes.rightContainer}>
                            <div>
                                <Text size="xl">Task Editor</Text>
                                <Text size="sm">Edit your selected task here</Text>
                            </div>
                            {selectedTask && (
                                <>
                                    <TasksRichTextEditor editor={editor} />
                                    <Button onClick={saveTaskContent} className={classes.button} color="blue" mt="md">Save Content</Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthorizeView>
    );
}

export default TaskPage;
