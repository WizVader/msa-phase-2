import './App.css';
import { createTheme, MantineProvider } from '@mantine/core';
import MainPage from './Components/MainPage.tsx';
import ThemeSwitcher from './Components/ThemeSwitcher.tsx';


const theme = createTheme({
    /** Put your mantine theme override here */
});

function App() {

    return (
        <MantineProvider theme={theme}>
            <>
                <div style={{ width: '100%', height: '100%' }}>
                <MainPage>
                </MainPage>

                <ThemeSwitcher>
                    </ThemeSwitcher>
                </div>
            </>

        </MantineProvider>
    );
}

export default App;