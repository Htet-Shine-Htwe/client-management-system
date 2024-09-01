# Client Management System React Project

This project is a React application built with TypeScript, utilizing Shadcn components and Tailwind CSS for styling. It includes secure storage of data using CryptoJS and supports role-based authentication for Admin and Super Admin. The frontend routes are dynamically generated based on the authenticated user.

## Features

- **TypeScript**: Adds type safety to your React application.
- **Shadcn Components**: A component library for building UI elements.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **CryptoJS**: Used for securely storing data from the server.
- **Role-Based Authentication**: Differentiates access for Admin and Super Admin.
- **Dynamic Routing**: Routes are generated dynamically based on user roles.

## Installation

Follow these steps to get the project up and running:

### 1. Clone the Repository

```bash
git clone https://github.com/Htet-Shine-Htwe/client-management-system.git
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory of your project and add the following environment variables:
```
VITE_API_URL_PREFIX={{$server_host}}
VITE_SECURE_KEY=your-secret-key(to use key in crypto)
```

### 4. Start the Development Server

```bash
npm run dev
```

The development server will start, and you can access the application at `http://localhost:5173`.

## Authentication

### **Role-Based Access**

- **Admin**: Can manage clients and perform admin-specific actions.
- **Super Admin**: Has all the capabilities of an Admin, plus additional permissions.

### **Login Process**

1. **Login Page**: Users enter their credentials (code and password).
2. **Token Storage**: Upon successful login, a token is stored securely using CryptoJS.
3. **Role-Based Routing**: Routes are dynamically adjusted based on the user’s role.

## Routing

### **Dynamic Routes**

Routes are generated dynamically based on the authenticated user’s role. The application will redirect users to the appropriate views based on their permissions. For example:

- **Admin**: Can access `/clients`
- **Super Admin**: Can access all routes including `/admin-management`

## Secure Storage with CryptoJS

We use CryptoJS to securely store tokens and sensitive information in local storage. 

## Components

### **Shadcn Components**

We use Shadcn components for UI elements. Make sure to refer to [Shadcn documentation](https://github.com/shadcn/shadcn) for detailed usage and customization options.

### **Tailwind CSS**

Tailwind CSS is used for styling. Ensure you follow the [Tailwind CSS documentation](https://tailwindcss.com/docs) for utility classes and customizations.

