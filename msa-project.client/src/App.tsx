import './App.css';
import { createTheme, MantineProvider } from '@mantine/core';
/*import EmailPasswordInput from './Components/EmailPasswordInput.tsx'*/
import MainPage from './Components/MainPage.tsx'
import ThemeSwitcher from './Components/ThemeSwitcher.tsx'

const theme = createTheme({
    /** Put your mantine theme override here */
});

function App() {

    return (
        <MantineProvider theme={theme}>
            <>
                <MainPage>
                </MainPage>
                <ThemeSwitcher>
                </ThemeSwitcher>
            </>

        </MantineProvider>
    );
}

export default App;