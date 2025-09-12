# plan4 - GST Management Portal

## Project Description

`plan4` is a web application designed to manage customer data and GST (Goods and Services Tax) filings for businesses in India. It provides a user-friendly interface for adding, editing, and viewing customer information, as well as managing their GST filing details.  The application includes features for tracking upcoming filings, recent registrations, and generating reports. This application uses Next.js, MongoDB, and leverages JSON Web Tokens (JWT) for authentication.

## Features and Functionality

*   **Customer Management:**
    *   Add new customers with detailed information including company details, registered owner details, GST details, and business details. (/app/customers/add-customer/page.jsx, /app/api/add-customer/route.js)
    *   View customer details, including company information, owner information, GST details, and business details. (/app/customers/[id]/page.jsx, /app/api/customer/[id]/route.js)
    *   Edit existing customer data. (/app/customers/[id]/edit/page.jsx, /app/api/customer/[id]/route.js)
    *   Delete customer records. (/app/api/customer/[id]/route.js)
    *   List of all customers with filtering and sorting options. (/app/customers/page.jsx, /app/api/customer/route.js)

*   **GST Filing Management:**
    *   Add new filing records for a customer. (/app/customers/[id]/filing/page.jsx, /app/api/filing/add/route.js)
    *   View a customer's filing history. (/app/customers/[id]/filing/page.jsx, /app/api/filing/[id]/route.js)
    *   Edit existing filing records. (/app/customers/[id]/filing/page.jsx, /app/api/filing/[id]/route.js)
    *   Delete filing records. (/app/customers/[id]/filing/page.jsx, /app/api/filing/[id]/route.js)

*   **Dashboard:**
    *   Displays key statistics such as total number of customers, a breakdown of registration types (Regular vs. Composition), upcoming GST filers, and recent registrations. (/app/dashboard/page.jsx, /app/api/dashboard/route.js)

*   **Authentication:**
    *   Secure admin login using email and password. (/app/auth/login/page.jsx, /app/api/auth/login/route.js, /lib/auth.js)
    *   Session management using JWT (JSON Web Tokens) and cookies. (/lib/auth.js)
    *   Logout functionality. (/app/api/auth/logout/route.js)

## Technology Stack

*   **Frontend:**
    *   Next.js (React Framework)
    *   Radix UI (UI Component Library)
    *   Lucide React (Icons)
    *   Styled Components (CSS-in-JS)

*   **Backend:**
    *   Node.js
    *   Next.js API Routes
    *   MongoDB (Database)
    *   Mongoose (ODM)
    *   jose (JWT library)

*   **Middleware:**
    *   Next.js Middleware for authentication and route protection. (/middleware.js)

## Prerequisites

Before you begin, ensure you have met the following requirements:

*   Node.js (v18 or higher) installed.
*   npm or yarn package manager installed.
*   MongoDB installed and running locally or accessible remotely.
*   Environment variables configured (see Configuration).

## Configuration

Create a `.env.local` file in the root of your project and add the following environment variables:

```
MONGO_URI=<your_mongodb_connection_string>
SESSION_SECRET=<a_secure_random_string>
AUTH_EMAIL=<your_admin_email>
AUTH_PASSWORD=<your_admin_password>
```

*   `MONGO_URI`:  The connection string for your MongoDB database.  Example: `mongodb://localhost:27017/plan4db`.
*   `SESSION_SECRET`: A strong, randomly generated secret key used to sign JWTs.  **Important:** Keep this secret secure.
*   `AUTH_EMAIL`:  The email address for the admin user.
*   `AUTH_PASSWORD`: The password for the admin user.

## Installation Instructions

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/MrAnsif/plan4.git
    cd plan4
    ```

2.  **Install dependencies:**

    ```bash
    npm install  # or yarn install
    ```

3.  **Start the development server:**

    ```bash
    npm run dev  # or yarn dev
    ```

    This will start the application on `http://localhost:3000`.

## Usage Guide

1.  **Access the application:**

    Open your browser and navigate to `http://localhost:3000`.

2.  **Login:**

    You will be redirected to the login page (`/auth/login`). Enter the email and password configured in your `.env.local` file.

3.  **Dashboard:**

    After successful login, you will be redirected to the dashboard (`/dashboard`), which provides an overview of customer statistics, upcoming filings, and recent registrations.

4.  **Customer Management:**

    *   Navigate to the "Customers" page (`/customers`) to view a list of all customers.
    *   Click on a customer's name to view their detailed information.
    *   Click the "Edit Details" button on the customer details page to edit the customer's information.
    *   Click the "Add Customer" link in the sidebar or go to `/customers/add-customer` to add a new customer.
    *   Click the "Filing" button on the customer details page to manage the filing information for that specific customer.

5.  **GST Filing Management:**

    *   On the customer filing page (`/customers/[id]/filing`), you can add new filing records, view the filing history, edit existing records, and delete records.

## API Documentation

### Customer API Endpoints

*   **`POST /api/add-customer`**:  Adds a new customer.

    *   Request Body:  A JSON object containing customer details (companyName, companyAddress, companyPhone, registeredOwner, gstDetails, businessDetails).  See `models/customer.js` for the schema.
    *   Response:  JSON object with `success: true` and the new customer object, or an error message with a 500 status code.

*   **`GET /api/customer`**:  Retrieves a list of all customers with limited details(companyName, registeredOwner.ownerName, gstDetails.typeOfRegistration, gstDetails.filingStartDate, createdAt).

    *   Response:  JSON array of customer objects, or an error message with a 404 or 500 status code.

*   **`GET /api/customer/[id]`**:  Retrieves a specific customer by ID.

    *   Parameters: `id` (customer ID)
    *   Response:  JSON object containing the customer's details, or an error message with a 404 or 500 status code.

*   **`PUT /api/customer/[id]`**:  Updates an existing customer by ID.

    *   Parameters: `id` (customer ID)
    *   Request Body:  A JSON object containing the updated customer details.
    *   Response:  JSON object with `success: true` and the updated customer object, or an error message with a 500 status code.

*   **`DELETE /api/customer/[id]`**:  Deletes a customer by ID.

    *   Parameters: `id` (customer ID)
    *   Response:  JSON object with `success: true`, or an error message with a 500 status code.

### Filing API Endpoints

*   **`POST /api/filing/add`**:  Adds a new filing record for a customer.

    *   Request Body: A JSON object containing the filing details (customerId, filingDate, income, totalTaxPayable, gstr1, gstr3b, gstr9).  See `models/filings.js` for the schema.
    *   Response: JSON object with `success: true` and the new filing object, or an error message with a 500 status code.

*   **`GET /api/filing/[id]`**:  Retrieves a list of filing records for a specific customer.

    *   Parameters: `id` (customer ID)
    *   Response: JSON object with `success: true` and a `filings` array, or an error message with a 400 or 500 status code.

*   **`PUT /api/filing/[id]`**:  Updates an existing filing record by ID.

    *   Parameters: `id` (filing ID)
    *   Request Body:  A JSON object containing the updated filing details.
    *   Response:  JSON object with `success: true`, a `message`, and the updated filing object, or an error message with a 400, 404, or 500 status code.

*   **`DELETE /api/filing/[id]`**:  Deletes a filing record by ID.

    *   Parameters: `id` (filing ID)
    *   Response:  JSON object with `success: true`, or an error message with a 500 status code.

### Authentication API Endpoints

*   **`POST /api/auth/login`**: Logs in an admin user.

    *   Request Body:  JSON object with `email` and `password`.
    *   Response: JSON object with `success: true` and a `session_token` cookie is set, or an error message with a 401 status code.

*   **`POST /api/auth/logout`**: Logs out the current user.

    *   Response: JSON object with `success: true` and the `session_token` cookie is deleted.

*   **`GET /api/auth/session`**: Check if a user is logged in

    *   Response: JSON object with `isLoggedIn: true` if the user has a valid session or `isLoggedIn: false` otherwise.

### Dashboard API Endpoints

*   **`GET /api/dashboard`**: Retrieves data for the dashboard.

    *   Response:  JSON object containing `totalCustomers`, `typeOfRegistrationBreakdown`, `upcomingFilers`, and `recentRegistrations`, or an error message with a 500 status code.

## Contributing Guidelines

Contributions are welcome! To contribute to this project, follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Implement your changes.
4.  Test your changes thoroughly.
5.  Submit a pull request.

Please ensure that your code adheres to the project's coding style and conventions.

## License Information

License not specified. All rights reserved.

## Contact/Support Information

For questions or support, please contact [Your Name/Organization] at [Your Email Address].