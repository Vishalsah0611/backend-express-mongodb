# Backend - Express & MongoDB (User CRUD API)

A simple REST API built with **Express.js** and **MongoDB (Mongoose)** to manage users, supporting full CRUD operations, filtering, sorting, and validation.

## Features

- Create, Read, Update, and Delete users
- MongoDB integration using Mongoose (with schema validation)
- Filter users by name or email
- Sort users by any field (ascending/descending)
- Centralized, consistent JSON response format
- Centralized error handling (validation errors, invalid IDs, server errors)
- Environment-based configuration using `.env`

## Tech Stack

- **Node.js** + **Express.js** - server & routing
- **MongoDB** + **Mongoose** - database & ODM
- **dotenv** - environment variable management
- **pnpm** - package manager

## Project Structure

```
Backend/
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection setup
│   ├── controllers/
│   │   └── user.controller.js # Request handling / business logic
│   ├── models/
│   │   └── user.model.js      # Mongoose schema & data access functions
│   ├── routes/
│   │   ├── index.router.js    # Central router
│   │   └── user.router.js     # User-specific routes
│   ├── utils/
│   │   ├── response.js        # Success/error response formatter
│   │   └── handleError.js     # Centralized error classifier
│   └── server.js              # App entry point
├── .env                       # Environment variables (not committed)
├── .gitignore
├── package.json
└── pnpm-lock.yaml
```

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Vishalsah0611/backend-express-mongodb.git
cd backend-express-mongodb
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Configure environment variables
Create a `.env` file in the root directory:
```
MONGO_URI=mongodb://127.0.0.1:27017/backendDB
```

### 4. Make sure MongoDB is running locally
Ensure a local MongoDB instance is running on `127.0.0.1:27017` (or update `MONGO_URI` to point to your own instance, e.g. MongoDB Atlas).

### 5. Start the server
```bash
pnpm start
```
The server will run at `http://localhost:3000`.

## API Endpoints

Base URL: `http://localhost:3000/api/users`

| Method | Endpoint       | Description                        |
|--------|----------------|-------------------------------------|
| GET    | `/`            | Get all users (supports filters/sort) |
| GET    | `/:id`         | Get a single user by ID            |
| POST   | `/`            | Create a new user                  |
| PUT    | `/:id`         | Update an existing user            |
| DELETE | `/:id`         | Delete a user                      |

### Query Parameters (for `GET /`)
| Param   | Example              | Description                          |
|---------|-----------------------|---------------------------------------|
| `name`  | `?name=vishal`         | Filter users by name (partial, case-insensitive) |
| `email` | `?email=gmail`         | Filter users by email (partial, case-insensitive) |
| `sort`  | `?sort=name`           | Field to sort by (default: `createdAt`) |
| `order` | `?order=desc`          | Sort order: `asc` or `desc` (default: `asc`) |

### Request Body (for POST / PUT)
```json
{
  "name": "Vishal",
  "email": "vishal@example.com"
}
```

## Response Format

**Success:**
```json
{
  "success": true,
  "message": "Users fetched successfully",
  "data": [ ... ]
}
```

**Error:**
```json
{
  "success": false,
  "message": "User with id 123 not found"
}
```

## Validation Rules

- `name` - required, letters and spaces only
- `email` - required, must be a valid email format, stored in lowercase, and must be unique

## Error Handling

| Status Code | Meaning                          |
|-------------|-----------------------------------|
| 200         | Request successful                |
| 201         | Resource created successfully     |
| 400         | Invalid input / invalid ID format |
| 404         | Resource not found                |
| 500         | Unexpected server error           |

## Author

**Vishal Sah**
