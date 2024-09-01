# Laravel API Project

This Laravel project provides a set of API endpoints for managing admins, clients, and authentication. Below is a list of the available endpoints.

## API Endpoints

1. **Authentication**
   - **Login**: `POST /api/v1/login` - Authenticate a user and receive a token.
   - **Logout**: `POST /api/v1/logout` - Invalidate the user’s session.
   - **Me**: `GET /api/v1/me` - Retrieve information about the currently authenticated user.

2. **Admin Management**
   - **List Admins**: `GET /api/v1/admins` - Retrieve a list of all admins.
   - **Create Admin**: `POST /api/v1/admins` - Create a new admin.
   - **Delete Admin**: `POST /api/v1/admins/delete/{admin}` - Delete a specific admin.
   - **View Admin**: `GET /api/v1/admins/{admin}` - Retrieve details about a specific admin.
   - **Update Admin**: `PUT /api/v1/admins/{admin}` - Update details of a specific admin.

3. **Client Management**
   - **Assign Client**: `POST /api/v1/assign-client` - Assign a client to a user.
   - **List Clients**: `GET /api/v1/clients` - Retrieve a list of all clients.

## Error Handling

Ensure that your API calls handle errors appropriately. For failed authentication or other errors, the API will return a descriptive error message to assist in debugging.

## Testing

To ensure that all tasks and endpoints are working correctly, you can run the tests using Pest. Pest is a PHP testing framework that simplifies writing and running tests.

**Run Tests**
   - To run all tests in parallel, use the following command:
     ```bash
     pest --parallel
     ```
   - This command will execute the tests concurrently, which speeds up the testing process. Ensure you have Pest installed and properly configured in your Laravel project.

**Running Tests Locally**
   - If you prefer to run tests sequentially, use:
     ```bash
     pest
     ```
   - This will run the tests one at a time, which might be useful for debugging specific issues.

## Setup

To get started with this project, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Htet-Shine-Htwe/client-management-system
   ```

2. **Navigate to Project Directory**
   ```bash
   cd backend
   ```

3. **Install Dependencies**
   ```bash
   composer install
   ```

4. **Set Up Environment**
   - Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Generate an application key:
     ```bash
     php artisan key:generate
     ```

5. **Run Migrations**
   ```bash
   php artisan migrate
   ```

6. **Start the Server**
   ```bash
   php artisan serve
   ```

7. **Run Tests**
   ```bash
   pest --parallel
   ```
