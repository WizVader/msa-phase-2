import './App.css';
import { createTheme, MantineProvider } from '@mantine/core';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import TaskPage from './Pages/TaskPage.tsx';
import Layout from './Layout.tsx';
import PomodoroPage from './Pages/PomodoroPage.tsx';
import HabitTrackingPage from './Pages/HabitTrackingPage.tsx';
//import ThemeSwitcher from './Components/ThemeSwitcher.tsx';


const theme = createTheme({
    /** Put your mantine theme override here */
});

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/pomodoro",
                element: <PomodoroPage />
            },
            {
                path: "/habittracking",
                element: <HabitTrackingPage />
            },
            {
                path: "/tasks",
                element: <TaskPage />
            }
        ]
    }
]);
function App() {

    return (
        <MantineProvider defaultColorScheme='light' >
            <RouterProvider router={router} />
        </MantineProvider >
    );
}

export default App;