import './App.css';
import { MantineProvider } from '@mantine/core';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TaskPage from './Pages/TaskPage.tsx';
import MainPage from './Pages/MainPage.tsx';
import PomodoroPage from './Pages/PomodoroPage.tsx';
import HabitTrackingPage from './Pages/HabitTrackingPage.tsx';
import NotFoundTitle from './Components/NotFoundTitle.tsx';
import Layout from './Layout.tsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainPage />,
    },
    {
        path: '/home',
        element: <Layout />,
        children: [
            {
                path: "/home/pomodoro",
                element: <PomodoroPage />
            },
            {
                path: "/home/habittracking",
                element: <HabitTrackingPage />
            },
            {
                path: "/home/tasks",
                element: <TaskPage />
            }
        ]
    },
    {
        path: "*",
        element: <NotFoundTitle />
    }
]);

function App() {
    return (
        <MantineProvider>
            <RouterProvider router={router} />
        </MantineProvider>
    );
}

export default App;
