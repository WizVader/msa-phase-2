import './App.css';
import { createTheme, MantineProvider } from '@mantine/core';
import MainPage from './Pages/MainPage.tsx';
import PomodoroPage from './Pages/PomodoroPage.tsx';
import HabitTrackingPage from './Pages/HabitTrackingPage.tsx';
//import ThemeSwitcher from './Components/ThemeSwitcher.tsx';


const theme = createTheme({
    /** Put your mantine theme override here */
});

function App() {

    return (
        <MantineProvider defaultColorScheme='light' >
            <>
                <div style={{ width: '100%', height: '100%' }}>
                    {/*<PomodoroPage></PomodoroPage>*/}
                    <HabitTrackingPage></HabitTrackingPage>
                    {/*<MainPage></MainPage>*/}
                </div>
            </>

        </MantineProvider >
    );
}

export default App;