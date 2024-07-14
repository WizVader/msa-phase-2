import Timer from '../Components/Timer.tsx'
import AuthorizeView from '../Components/AuthorizeView.tsx'

function PomodoroPage() {
    return (
        <AuthorizeView>
            <Timer></Timer>
        </AuthorizeView>
    );
}

export default PomodoroPage;