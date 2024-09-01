# Client Management System

Welcome to the Client Management System project! This repository is designed to provide a complete solution for managing clients with simple architecture. The system includes a backend, frontend, and mobile application, each designed to work seamlessly together.

## Project Overview

The Client Management System is a sophisticated application that allows for the management of clients with different roles and functionalities. It consists of three main components:

- **Backend**: A robust API built with Laravel, providing endpoints for authentication, client management, and more.
- **Frontend**: A dynamic web application built with React and TypeScript, featuring a modern UI with Tailwind CSS and ShadCN for styling.
- **Mobile**: A Flutter application that offers mobile access to the client management features, ensuring a smooth user experience on the go.

## Project Structure

This repository contains the following folders:

- **`backend`**: Contains the Laravel project for the backend API. Includes all necessary code for authentication, client management, and more.
- **`frontend`**: Contains the React application with TypeScript for the web interface. Utilizes Tailwind CSS for styling and ShadCN for UI components.
- **`mobile`**: Contains the Flutter project for the mobile application. Provides a responsive interface for managing clients from mobile devices.

## Getting Started

To get started with the Client Management System, follow these instructions:

### 1. Clone the Repository

```bash
git clone https://github.com/Htet-Shine-Htwe/client-management-system.git
cd client-management-system
```

### 2. Set Up the Backend

Navigate to the `backend` folder and follow the setup instructions in the `README.md` file located there.

```bash
cd backend
composer install
npm install
php artisan key:generate
php artisan migrate
php artisan serve
```

### 3. Set Up the Frontend

Navigate to the `frontend` folder and follow the setup instructions in the `README.md` file located there.

```bash
cd frontend
npm install
npm start
```

### 4. Set Up the Mobile App

Navigate to the `mobile` folder and follow the setup instructions in the `README.md` file located there.

```bash
cd mobile
flutter pub get
flutter run
```

## Features

- **Backend**: 
  - Authentication (login, registration, token management) 
  - Client management (CRUD operations)
  - Role-based access control (Admin and Super Admin)

- **Frontend**: 
  - Responsive UI with Tailwind CSS 
  - Dynamic routing based on authentication 
  - Secure storage of authentication tokens using CryptoJS 

- **Mobile**: 
  - User-friendly login screen 
  - List of clients 
  - Error handling and role-based views

## API Endpoints

The backend API includes the following endpoints:

- **`GET /api/v1/admins`**: List all admins
- **`POST /api/v1/admins`**: Create a new admin
- **`POST /api/v1/admins/delete/{admin}`**: Delete an admin
- **`GET /api/v1/admins/{admin}`**: Get details of a specific admin
- **`PUT /api/v1/admins/{admin}`**: Update an admin
- **`POST /api/v1/assign-client`**: Assign a client to an admin
- **`GET /api/v1/clients`**: List all clients
- **`POST /api/v1/login`**: User login
- **`POST /api/v1/logout`**: User logout
- **`GET /api/v1/me`**: Get current authenticated user details
