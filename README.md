# Organiseasy

Organiseasy is a habit tracking and task management application designed to help users organize their daily activities and stay productive. This project leverages ASP.NET Core for the backend and React with Mantine for the frontend, ensuring a seamless and efficient user experience.

## Features

- **Authentication**: Secure user authentication using ASP.NET Core Identity framework.
- **Habit Tracking**: Add, update, and manage daily habits.
- **Task Management**: Organize tasks with a rich text editor.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Navigation**: Easy navigation with a sidebar for quick access to different sections.

## Technologies Used

- **Frontend**: React, Mantine, Tiptap
- **Backend**: ASP.NET Core
- **Database**: Entity Framework Core
- **Authentication**: ASP.NET Core Identity
- **State Management**: React Context API
- **Other Tools**: Vite, Axios

## Getting Started

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/WizVader/msa-phase-2.git
    cd organiseasy
    ```

2. **Setup the backend:**
    ```bash
    cd backend
    dotnet restore
    dotnet ef database update
    dotnet run
    ```

3. **Setup the frontend:**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

### Configuration

- **Backend**: Configure the connection string in `appsettings.json` to point to your SQL Server instance.
- **Frontend**: Modify `vite.config.ts` to set the correct API proxy settings.

## Usage

### Authentication

The authentication system uses ASP.NET Core Identity. You can register a new account or log in using existing credentials. Upon successful login, user details are printed to the console.

### Habit Tracking

- **Add Habit**: Users can add new habits by providing the name and description.
- **Check In Habit**: Users can mark habits as completed for the day. This updates the `isCompletedToday` field both in the UI and the database.

### Task Management

The task management feature utilizes Mantine's RichTextEditor integrated with Tiptap for rich text editing functionality. Users can create, update, and manage their tasks with a rich text interface.

## API Endpoints

### Authentication

- **Register**: `POST /api/auth/register`
- **Login**: `POST /api/auth/login`
- **Logout**: `POST /api/auth/logout`
- **Ping Auth**: `GET /api/auth/pingauth`

### Habits

- **Get Habits**: `GET /api/habits`
- **Add Habit**: `POST /api/habits`
- **Check In Habit**: `PUT /api/habits/checkinhabit/{id}`

### Tasks

- **Get Tasks**: `GET /api/tasks`
- **Add Task**: `POST /api/tasks`
- **Update Task**: `PUT /api/tasks/{id}`
- **Delete Task**: `DELETE /api/tasks/{id}`

## Contribution

Contributions are welcome! Please fork the repository and create a pull request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

- Charanjeet Santhanam Viswanathan
