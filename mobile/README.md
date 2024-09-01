# Flutter CMS App

This Flutter project demonstrates how to build a login screen that interacts with a Laravel backend for authentication, displays a list of clients, and includes proper error handling for failed login attempts.

## Features

- **Login Screen**: A simple login screen that communicates with the Laravel backend for authentication.
- **Client List**: After a successful login, users are redirected to a page displaying a list of clients.
- **Error Handling**: Proper error handling for failed login attempts.
- **Role-Based Access**: Authentication roles include Admin and Super Admin, affecting the displayed client list.
- **Secure Storage**: Uses `CryptoJS` for secure storage of authentication tokens.

## Installation

Follow these steps to get the project up and running:

### 1. Clone the Repository

```bash
git clone https://github.com/Htet-Shine-Htwe/client-management-system.git
cd mobile
```

### 2. Install Dependencies

```bash
flutter pub get
```

### 3. Configure Environment

Add the API URL to your environment configuration. Update the `.env` file or use another configuration method appropriate for Flutter.

### 4. Run the App

```bash
flutter run
```

This will start the application, and you can test it on an emulator or connected device.

## Login Flow

1. **Login Page**: Users enter their code and password.
2. **Authentication**: The credentials are sent to the Laravel backend (`http://localhost:8000/api/v1/login`).
3. **Token Storage**: Upon successful login, the token is securely stored using `CryptoJS`.
4. **Redirect**: On successful login, users are redirected to the client list page. If login fails, an error message is displayed.

## Error Handling

The application handles errors such as invalid credentials and displays appropriate messages to users. Ensure the error messages are clear and actionable.

## Fetching Client List

After a successful login, the client list is fetched from the backend API (`/api/v1/clients`) and displayed in a list format.

## Project Structure

The project follows a modular structure with separate files for authentication, client list, and utilities. 