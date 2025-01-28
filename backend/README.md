# 🍴 Food Delivery Backend Application

This backend application is built to streamline interactions between **Customers**, **Restaurants**, and **Delivery Staff**, ensuring efficient order management, real-time status updates, and seamless communication via email notifications. 

The project demonstrates advanced backend development skills in the JavaScript environment, with robust functionality and a clear structure.

## 🌟 Features
### User Roles
- **Customer**: Browse menus, place orders, and track updates.
- **Restaurant**: Manage menu items, handle orders (accept/reject/prepare/dispatch).
- **Delivery Staff**: View and update delivery statuses.

### Key Functionalities
#### **Customer Features**
- View a list of restaurants.
- Browse restaurant menus and add items to the cart.
- Place orders and receive real-time email notifications.
- Track order status updates.

#### **Restaurant Features**
- Add and manage menu items.
- Receive order notifications via email.
- Handle orders with the following actions:
  - **Accept/Reject**: Decide whether to process the order.
  - **Prepare**: Update order status to "Prepared."
  - **Dispatch**: Mark the order as dispatched.

#### **Order Management Workflow**
1. Order Placement (Customer).
2. Order Notification (Email to Restaurant).
3. Order Status Updates:
   - Accepted → Prepared → Dispatched → Delivered.


## 🔧 Built With
- **Node.js**: Backend runtime environment.
- **Express.js**: Framework for building REST APIs.
- **MongoDB**: Database for storing user, menu, and order data.
- **Nodemailer**: Library for sending email notifications.



## How to Run the Project

Follow these steps to set up and run the project locally:

1. Clone the repository:
   ```bash
    git clone https://github.com/amitranjan75way/food-delivery-app
2. go to project directory
   ```bash
    cd food-delivery-backend
3. Install dependencies:
   ```bash
    npm install
   ```
4. run file
   ```bash
    npm run local
   ```
## ER Diagram 
![ER-Diagram](https://github.com/user-attachments/assets/eaa57399-04f4-412f-b7fc-57997e43ea60)


## Project Structure
- Authentication: Secure login and sign-up mechanisms.
- Email Notifications: Automatic emails for customers and restaurants after order placement.
- Order Management: Real-time order placement and status updates.
- Menu Management: Restaurants can manage their menu listings.
  ![diagram-export-18-01-2025-16_12_10](https://github.com/user-attachments/assets/989cc7a2-72c2-4fa6-a7c3-8953f6fd2998)

## API Documentation -

# User Management API

This API provides functionalities to manage users in a system that supports different roles like Customer, Restaurant, and Delivery Staff. It allows users to register, login, and logout.

## API Endpoints

### 1. **User Registration**

**Endpoint:** `/users/register`

**Method:** `POST`

**Description:** Register a new user. This can be a Customer, Restaurant, or Delivery Staff.

#### Request Body:
```json
{
  "name": "Jane Doe",
  "email": "janedoe@example.com",
  "password": "mypassword",
  "role": "CUSTOMER"
}
```

- **name** (string): The user's name.
- **email** (string): The user's email address.
- **password** (string): The user's password.
- **role** (string): The role of the user (either `CUSTOMER`, `RESTAURANT`, or `DELIVERY`).

#### Responses:
- **200 OK**: User registered successfully.
  ```json
  {
    "success": true,
    "data": {
      "id": "63f21c84e7a51093c507d202",
      "name": "Jane Doe",
      "email": "janedoe@example.com",
      "role": "USER"
    },
    "message": "User registered successfully"
  }
  ```
- **409 Conflict**: User already exists.
  ```json
  {
    "success": false,
    "error_code": 409,
    "message": "User already exists",
    "data": {}
  }
  ```

### 2. **User Login**

**Endpoint:** `/users/login`

**Method:** `POST`

**Description:** Login for Customer, Restaurant, or Delivery Staff.

#### Request Body:
```json
{
  "email": "janedoe@example.com",
  "password": "mypassword"
}
```

- **email** (string): The user's email address.
- **password** (string): The user's password.

#### Responses:
- **200 OK**: User logged in successfully.
  ```json
  {
    "success": true,
    "data": {
      "user": {
        "id": "63f21c84e7a51093c507d202",
        "name": "Jane Doe",
        "email": "janedoe@example.com",
        "role": "USER"
      },
      "accessToken": "jwt-token"
    },
    "message": "User logged in successfully"
  }
  ```
- **401 Unauthorized**: Invalid credentials.
  ```json
  {
    "success": false,
    "error_code": 401,
    "message": "Invalid credentials",
    "data": {}
  }
  ```

### 3. **User Logout**

**Endpoint:** `/users/logout`

**Method:** `POST`

**Description:** Logout the currently logged-in user.

#### Responses:
- **200 OK**: User logged out successfully.
  ```json
  {
    "success": true,
    "data": {},
    "message": "User logged out successfully"
  }
  ```

## Components / Schema

### Register User Schema
The `RegisterUser` schema is used for the registration endpoint. It expects the following fields:
- **name** (string)
- **email** (string)
- **password** (string)
- **role** (string)

### Login User Schema
The `LoginUser` schema is used for the login endpoint. It expects the following fields:
- **email** (string)
- **password** (string)

---

### Notes
- Ensure the email used during registration is unique.
- Roles available are `CUSTOMER`, `RESTAURANT`, and `DELIVERY`. 
- JWT tokens are used for user authentication during login.

Here’s the README template for the second API:

---

# Customer Management API

This API provides functionalities for customers to interact with restaurants, add items to their cart, view restaurant menus, and place orders.

## API Endpoints

### 1. **Add or Remove Item to/from Cart**

**Endpoint:** `/customer/addItemToCart/{restaurantId}/{itemId}`

**Method:** `POST`

**Description:** Add or remove an item to/from the customer's cart.

#### Path Parameters:
- **restaurantId** (string): The ID of the restaurant.
- **itemId** (string): The ID of the menu item.

#### Responses:
- **200 OK**: Item added or removed successfully.
  ```json
  {
    "success": true,
    "data": {
      "cartId": "63f21c84e7a51093c507d202",
      "items": [
        {
          "id": "63f21c84e7a51093c507d203",
          "name": "Pizza",
          "price": 10
        }
      ],
      "totalAmount": 10,
      "restaurantId": "63f21c84e7a51093c507d204"
    },
    "message": "Item added to cart successfully"
  }
  ```
- **404 Not Found**: Item or customer/cart not found.
  ```json
  {
    "success": false,
    "error_code": 404,
    "message": "Item or customer/cart not found",
    "data": {}
  }
  ```

### 2. **Get List of Restaurants**

**Endpoint:** `/customer/restaurantList`

**Method:** `GET`

**Description:** Get the list of all restaurants.

#### Responses:
- **200 OK**: List of restaurants fetched successfully.
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "63f21c84e7a51093c507d205",
        "name": "Italian Bistro",
        "address": "123 Main St"
      },
      {
        "id": "63f21c84e7a51093c507d206",
        "name": "Sushi House",
        "address": "456 Elm St"
      }
    ],
    "message": "Restaurants fetched successfully"
  }
  ```

### 3. **Get Menu Items for a Specific Restaurant**

**Endpoint:** `/customer/{restaurantId}`

**Method:** `GET`

**Description:** Get the menu items for a specific restaurant.

#### Path Parameters:
- **restaurantId** (string): The ID of the restaurant.

#### Responses:
- **200 OK**: Menu items fetched successfully.
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "63f21c84e7a51093c507d207",
        "name": "Pasta",
        "price": 12,
        "isAvailable": true
      },
      {
        "id": "63f21c84e7a51093c507d208",
        "name": "Salad",
        "price": 8,
        "isAvailable": true
      }
    ],
    "message": "Menu items fetched successfully"
  }
  ```
- **404 Not Found**: Restaurant not found.
  ```json
  {
    "success": false,
    "error_code": 404,
    "message": "Restaurant not found",
    "data": {}
  }
  ```

### 4. **Place an Order**

**Endpoint:** `/customer/placeOrder`

**Method:** `POST`

**Description:** Place an order for the items in the user's cart. If the cart is empty, it will return an error.

#### Security:
- **BearerAuth**: User needs to be authenticated with a JWT token.

#### Request Body:
- No request body is required. Cart details are fetched from the user's session.

#### Responses:
- **200 OK**: Order placed successfully.
  ```json
  {
    "order": {
      "userId": "63f21c84e7a51093c507d202",
      "restaurantId": "63f21c84e7a51093c507d204",
      "items": ["63f21c84e7a51093c507d203"],
      "totalAmount": 10,
      "status": "placed",
      "deliveryAddress": "123 Main St"
    }
  }
  ```

- **400 Bad Request**: Cart is empty, cannot place order.
  ```json
  {
    "error": "Cart is empty, cannot place order"
  }
  ```

- **404 Not Found**: User or customer details not found.
  ```json
  {
    "error": "User not found"
  }
  ```

- **401 Unauthorized**: Unauthorized access, user not found.
  ```json
  {
    "error": "User not found, please login again"
  }
  ```

## Components / Schema

### Cart and Order Schema

The cart and order are represented in the following structures:
- **userId** (string): ID of the user placing the order.
- **restaurantId** (string): ID of the restaurant receiving the order.
- **items** (array): List of item IDs being ordered.
- **totalAmount** (number): Total amount of the order.
- **status** (string): The current status of the order, e.g., `placed`, `accepted`, `prepared`, `dispatched`, `delivered`.
- **deliveryAddress** (string): Delivery address for the order.

---

### Notes
- Ensure that the user is logged in (authenticated) when placing an order.
- Users can add/remove items from their cart and place an order for the items in the cart.
- The cart details are managed based on the session of the user.
Here’s the README template for the second API:

---

# Customer Management API

This API provides functionalities for customers to interact with restaurants, add items to their cart, view restaurant menus, and place orders.

## API Endpoints

### 1. **Add or Remove Item to/from Cart**

**Endpoint:** `/customer/addItemToCart/{restaurantId}/{itemId}`

**Method:** `POST`

**Description:** Add or remove an item to/from the customer's cart.

#### Path Parameters:
- **restaurantId** (string): The ID of the restaurant.
- **itemId** (string): The ID of the menu item.

#### Responses:
- **200 OK**: Item added or removed successfully.
  ```json
  {
    "success": true,
    "data": {
      "cartId": "63f21c84e7a51093c507d202",
      "items": [
        {
          "id": "63f21c84e7a51093c507d203",
          "name": "Pizza",
          "price": 10
        }
      ],
      "totalAmount": 10,
      "restaurantId": "63f21c84e7a51093c507d204"
    },
    "message": "Item added to cart successfully"
  }
  ```
- **404 Not Found**: Item or customer/cart not found.
  ```json
  {
    "success": false,
    "error_code": 404,
    "message": "Item or customer/cart not found",
    "data": {}
  }
  ```

### 2. **Get List of Restaurants**

**Endpoint:** `/customer/restaurantList`

**Method:** `GET`

**Description:** Get the list of all restaurants.

#### Responses:
- **200 OK**: List of restaurants fetched successfully.
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "63f21c84e7a51093c507d205",
        "name": "Italian Bistro",
        "address": "123 Main St"
      },
      {
        "id": "63f21c84e7a51093c507d206",
        "name": "Sushi House",
        "address": "456 Elm St"
      }
    ],
    "message": "Restaurants fetched successfully"
  }
  ```

### 3. **Get Menu Items for a Specific Restaurant**

**Endpoint:** `/customer/{restaurantId}`

**Method:** `GET`

**Description:** Get the menu items for a specific restaurant.

#### Path Parameters:
- **restaurantId** (string): The ID of the restaurant.

#### Responses:
- **200 OK**: Menu items fetched successfully.
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "63f21c84e7a51093c507d207",
        "name": "Pasta",
        "price": 12,
        "isAvailable": true
      },
      {
        "id": "63f21c84e7a51093c507d208",
        "name": "Salad",
        "price": 8,
        "isAvailable": true
      }
    ],
    "message": "Menu items fetched successfully"
  }
  ```
- **404 Not Found**: Restaurant not found.
  ```json
  {
    "success": false,
    "error_code": 404,
    "message": "Restaurant not found",
    "data": {}
  }
  ```

### 4. **Place an Order**

**Endpoint:** `/customer/placeOrder`

**Method:** `POST`

**Description:** Place an order for the items in the user's cart. If the cart is empty, it will return an error.

#### Security:
- **BearerAuth**: User needs to be authenticated with a JWT token.

#### Request Body:
- No request body is required. Cart details are fetched from the user's session.

#### Responses:
- **200 OK**: Order placed successfully.
  ```json
  {
    "order": {
      "userId": "63f21c84e7a51093c507d202",
      "restaurantId": "63f21c84e7a51093c507d204",
      "items": ["63f21c84e7a51093c507d203"],
      "totalAmount": 10,
      "status": "placed",
      "deliveryAddress": "123 Main St"
    }
  }
  ```

- **400 Bad Request**: Cart is empty, cannot place order.
  ```json
  {
    "error": "Cart is empty, cannot place order"
  }
  ```

- **404 Not Found**: User or customer details not found.
  ```json
  {
    "error": "User not found"
  }
  ```

- **401 Unauthorized**: Unauthorized access, user not found.
  ```json
  {
    "error": "User not found, please login again"
  }
  ```

## Components / Schema

### Cart and Order Schema

The cart and order are represented in the following structures:
- **userId** (string): ID of the user placing the order.
- **restaurantId** (string): ID of the restaurant receiving the order.
- **items** (array): List of item IDs being ordered.
- **totalAmount** (number): Total amount of the order.
- **status** (string): The current status of the order, e.g., `placed`, `accepted`, `prepared`, `dispatched`, `delivered`.
- **deliveryAddress** (string): Delivery address for the order.

---

### Notes
- Ensure that the user is logged in (authenticated) when placing an order.
- Users can add/remove items from their cart and place an order for the items in the cart.
- The cart details are managed based on the session of the user.

Here is a sample `README.md` file for the API specification you've shared:

---

# Restaurant Management API

This API allows restaurant owners and administrators to manage restaurants, menu items, and orders. It includes endpoints for adding menu items, viewing menus, updating order statuses, and retrieving restaurant information.

## API Endpoints

### 1. **Add a New Menu Item**
**POST** `/restaurant/add-item`

- **Summary**: Adds a new menu item to the restaurant.
- **Request Body** (application/json):
  ```json
  {
    "name": "Margherita Pizza",
    "price": 12.99,
    "description": "Classic Margherita Pizza with mozzarella cheese and tomato sauce",
    "isAvailable": true
  }
  ```
- **Response**:
  - `200 OK`: Successfully added the menu item.
  - `401 Unauthorized`: User not authorized or invalid.

### 2. **Get All Menu Items for a Specific Restaurant**
**GET** `/restaurant/menu/{restaurantId}`

- **Summary**: Fetches all menu items for a specific restaurant.
- **Parameters**:
  - `restaurantId` (path parameter): The ID of the restaurant.
- **Response**:
  - `200 OK`: List of menu items.
  - `404 Not Found`: Restaurant not found.

### 3. **Get the List of All Restaurants**
**GET** `/restaurant`

- **Summary**: Fetches a list of all restaurants.
- **Response**:
  - `200 OK`: List of restaurants.
  - `500 Internal Server Error`: An unexpected error occurred.

### 4. **Update Order Status by Restaurant**
**PUT** `/restaurant/order/{restaurantId}/{orderId}`

- **Summary**: Updates the status of an order for a specific restaurant.
- **Parameters**:
  - `restaurantId` (path parameter): The ID of the restaurant.
  - `orderId` (path parameter): The ID of the order.
- **Request Body** (application/json):
  ```json
  {
    "status": "accepted"
  }
  ```
- **Response**:
  - `200 OK`: Successfully updated the order status.
  - `400 Bad Request`: Invalid parameters.
  - `404 Not Found`: Order not found.
  - `500 Internal Server Error`: An unexpected error occurred.

## Example Responses

### 1. **Successful Response for Adding a Menu Item**
```json
{
  "success": true,
  "data": {
    "id": "63f21c84e7a51093c507d202",
    "name": "Margherita Pizza",
    "price": 12.99,
    "description": "Classic Margherita Pizza with mozzarella cheese and tomato sauce",
    "isAvailable": true
  },
  "message": "Item added successfully"
}
```

### 2. **Successful Response for Fetching Menu Items**
```json
{
  "success": true,
  "data": [
    {
      "id": "63f21c84e7a51093c507d203",
      "name": "Margherita Pizza",
      "price": 12.99,
      "description": "Classic Margherita Pizza with mozzarella cheese and tomato sauce",
      "isAvailable": true
    },
    {
      "id": "63f21c84e7a51093c507d204",
      "name": "Pepperoni Pizza",
      "price": 15.99,
      "description": "Pepperoni Pizza with spicy salami and cheese",
      "isAvailable": true
    }
  ],
  "message": "Menu items fetched successfully"
}
```

### 3. **Error Response Example (Order Not Found)**
```json
{
  "success": false,
  "error_code": 404,
  "message": "Order not found",
  "data": {}
}
```

## Authentication

Some endpoints (e.g., adding menu items) require authentication. Make sure to include a valid authorization token in the headers for requests requiring authentication.

## Error Codes

- **401 Unauthorized**: User is not authorized, please log in again.
- **400 Bad Request**: Invalid request parameters.
- **404 Not Found**: Requested resource not found (e.g., restaurant or order).
- **500 Internal Server Error**: An unexpected error occurred.

## How to Use the API

1. **Set up the API server** on your local machine or in a production environment.
2. **Use a tool like Postman or cURL** to make requests to the API.
3. **Make sure to include authentication tokens** where required in your requests.
4. **Refer to the documentation** for detailed endpoint information.

---

This `README.md` provides a clear overview of the API's functionality, including request/response examples, error codes, and usage instructions.


   
