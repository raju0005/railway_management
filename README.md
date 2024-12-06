
# Railway management Api
This is a Railway Management System API where users can check for available trains between stations, book seats, and view their booking details. Admin users can add new trains, update seat availability, and manage the system.



## Features

- User Registration and Login
- Train Availability Search (by source and destination)
- Seat Booking and Booking Details
- Admin functionality to add trains 




##  Tech Stack
 - **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt.js

## Setup Instructions
### Prerequisites
- **Node.js** (v14 or higher)
- **PostgreSQL** database
- **Postman** (optional, for API testing)
### Step 1: Clone the Repository
Clone this repository to your local machine:

```bash
git clone https://github.com/raju0005/railway-management-api.git
cd railway-management-api

```
### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set Up Database
- Install PostgreSQL on your machine if you haven’t already.
- Create a new database for the project.
- Create the necessary tables in the database. You can use the following SQL schema:
```bash
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user'
);

CREATE TABLE trains (
    id SERIAL PRIMARY KEY,
    source VARCHAR(100),
    destination VARCHAR(100),
    available_seats INT
);

CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    train_id INT REFERENCES trains(id),
    seats_booked INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
### Step 4: Configure Environment Variables
- Create a .env file in the root of the project and add the following variables:
``` bash
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=railway_db
DB_PASSWORD=your_db_password
DB_PORT=5432
JWT_SECRET=your_jwt_secret
ADMIN_API_KEY=your_key
```
### Step 5: Run the Application

``` bash
nodemon index.js
```
- The server will be running at http://localhost:5000.

### Step 6: API Documentation 
- You can use Postman or any API testing tool to test the endpoints.

####    API Endpoints
- **POST** /register: Register a new user (name, email, password)
- **POST** /login: Log in a user (email, password) and get a JWT token
- **GET** /trains/availability: Check available trains between source and destination
- **POST** /trains/book: Book seats on a train (train_id, seats)
- **GET** /user/bookings: Get booking details for a user (JWT token required).

## Troubleshooting

- **Database Connection Error**: Ensure your PostgreSQL server is running and that the database credentials in the .env file are correct.
- **JWT Authentication**: If you encounter errors related to JWT, ensure the token is correctly sent in the Authorization header as Bearer <your_token>.


### Key Features:
- **Setup Instructions**: How to install dependencies and configure the environment.
- **API Documentation**: A comprehensive list of API endpoints and their usage.
- **Testing**: Optional setup for running tests with Mocha or Jest.
- **Troubleshooting**: Common troubleshooting steps for database or JWT-related issues.
