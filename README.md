# Food Delivery App

This is a full-stack food delivery application built using the **MERN Stack** (MongoDB, Express.js, React.js, and Node.js) on the backend, with plans to migrate to PostgreSQL using TypeORM. The app allows users to browse restaurants, view menus, and manage orders. The frontend is built with React.js and integrates with the backend via a RESTful API.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Folder Structure](#folder-structure)
- [Routes and Authentication](#routes-and-authentication)
- [API Documentation](#api-documentation)
- [License](#license)

---

## Features

### Backend
- User authentication and role-based authorization (Customer, Restaurant Owner, Delivery Staff).
- Schema models for Users, Restaurants, Menu Items, Orders, and Carts.
- Integration of password hashing using **bcrypt**.
- Token-based authentication with **JWT**.
- API endpoints for:
  - User registration and login.
  - Adding menu items (restricted to restaurant owners).
  - Fetching restaurant lists and details.
  - Managing carts and orders.

### Frontend
- Public and private routing based on user authentication.
- Components for viewing restaurants, adding menu items, and user management.
- Form validation using **react-hook-form**.
- Loading states, error handling, and skeleton loaders.
- Responsive design using CSS modules.

---

## Technologies Used

### Backend:
- **Node.js**
- **Express.js**
- **MongoDB with Mongoose ORM** (current)
- **PostgreSQL with TypeORM** (migration in progress)
- **JWT** for authentication
- **bcrypt** for password hashing

### Frontend:
- **React.js** with TypeScript
- **React Router** for routing
- **Redux Toolkit Query (RTK Query)** for state management and API calls
- **CSS Modules** for styling

---

## Backend Setup

### Prerequisites
1. Install [Node.js](https://nodejs.org/).
2. Install [MongoDB](https://www.mongodb.com/) or set up a cloud MongoDB instance (e.g., MongoDB Atlas).

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo-url.git
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/foodDeliveryDB
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:
   ```bash
   npm run local
   ```
   The server will start at `http://localhost:4000`.

---

## Frontend Setup

### Prerequisites
1. Install [Node.js](https://nodejs.org/).

### Steps
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will run at `http://localhost:3000`.

---



---

## Routes and Authentication

### Public Routes:
- **Home Page** (`/`)
- **Restaurant Details** (`/restaurant/:id`)
- **Customer Details** (`/customer`)

### Private Routes:
- **Add Menu Item** (`/restaurant/addItem`) - Restricted to restaurant owners.
- **Login and Register** - Hidden for logged-in users.

### Protected Routes Implementation:
- Used React Router with role-based access control.
- Example:

```tsx
<Route path="/restaurant/addItem" element={
  <PrivateRoute roles={['RESTAURANT_OWNER']}>
    <AddMenuItem />
  </PrivateRoute>
} />
```

---

## API Documentation

### Example Endpoints:

#### User Registration:
**POST** `/api/auth/register`
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "CUSTOMER"
}
```

#### Fetch Restaurants:
**GET** `/api/restaurants`

Response:
```json
[
  {
    "_id": "abc123",
    "userId": { "name": "Restaurant A", "email": "owner@example.com" },
    "menu": [
      { "name": "Pizza", "price": 12.99, "isAvailable": true }
    ]
  }
]
```

#### Add Menu Item:
**POST** `/api/menu/add`
Headers:
```json
{
  "Authorization": "Bearer your_jwt_token"
}
```
Body:
```json
{
  "name": "Burger",
  "price": 9.99,
  "isAvailable": true,
  "description": "Delicious burger"
}
```

---

## License
This project is licensed under the MIT License.

