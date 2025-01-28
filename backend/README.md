
# Backend README for Group Chat Application

## Overview

This backend is built using Node.js with Express and MongoDB, and it provides APIs for user authentication, group management, and real-time chat functionality using Socket.io. It also supports email invitations to join groups.

## Prerequisites

- Node.js and npm (or pnpm) installed
- MongoDB (or an alternative database) running

## Installation

1. Clone the repository to your local machine.
2. Navigate to the backend folder.

    ```bash
    cd path/to/backend
    ```

3. Install the dependencies using either npm or pnpm:

    ```bash
    npm install
    ```

    or

    ```bash
    pnpm install
    ```

4. Create a `.env` file in the root directory with the following environment variables:

    ```
    MONGO_URI=<Your MongoDB URI>
    JWT_SECRET=<Your JWT Secret>
    BASE_URL=<Your Base URL for Invite Links>
    MAIL_HOST=<Your Mail Host>
    MAIL_PORT=<Your Mail Port>
    MAIL_USER=<Your Mail User>
    MAIL_PASS=<Your Mail Password>
    ```

    This file contains sensitive configuration settings, such as your database connection URI and email service credentials.

## Available Scripts

- **`local`**: Runs the app in development mode with `nodemon` for automatic server restarts.
  
    ```bash
    npm run local
    ```

- **`start`**: Runs the app in a production-like environment using `ts-node`.

    ```bash
    npm start
    ```

- **`dev`**: Builds and runs the app in development mode.
  
    ```bash
    npm run dev
    ```

- **`prod`**: Builds the app and runs it in production mode.
  
    ```bash
    npm run prod
    ```

- **`build`**: Transpiles TypeScript code into JavaScript.

    ```bash
    npm run build
    ```

- **`lint`**: Lints the code using ESLint.

    ```bash
    npm run lint
    ```

- **`format`**: Formats the code using Prettier.

    ```bash
    npm run format
    ```

## Backend Structure

### 1. **User Authentication**
   - **Signup**: Users can sign up with their name, email, and password. Passwords are hashed using bcrypt before saving to the database.
   - **Login**: Users can log in to the app using email and password, and a JWT token will be generated for the session.
   - **JWT Tokens**: JWT tokens are used for user authentication and must be included in the headers of protected routes.

### 2. **Group Management**
   - **Create Group**: Users can create a new group with a name, description, and profile picture.
   - **Invite User**: Admins can invite users to join the group via a unique invite link, which is sent via email.
   - **Join Request**: Non-member users can send a join request to be a member of the group. Admins can approve or reject these requests.
   - **Group Details**: Each group has an admin, a list of members, and an invite link. Admins can manage the group and its members.

### 3. **Chat Functionality**
   - **Real-time Messaging**: Socket.io is used to send and receive messages in real-time.
   - **Messages**: Users can send and receive messages in a group, with messages displayed in the group chat.
   - **Sender & Receiver**: Messages are tagged with the sender's information (name, email, profile picture).

### 4. **Email Invitations**
   - **Sending Invitations**: When a user is invited to join a group, an email is sent via **nodemailer** with a link to join the group.

## Example Routes

1. **POST /api/auth/signup**: Registers a new user.
   
    Request Body:
    ```json
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "password123"
    }
    ```

2. **POST /api/auth/login**: Logs in a user and generates a JWT token.

    Request Body:
    ```json
    {
      "email": "johndoe@example.com",
      "password": "password123"
    }
    ```

    Response:
    ```json
    {
      "token": "<JWT_TOKEN>"
    }
    ```

3. **POST /api/groups**: Creates a new group.
   
    Request Body:
    ```json
    {
      "name": "Cool Group",
      "description": "A group for cool people",
      "admin": "<user_id>"
    }
    ```

4. **POST /api/groups/:id/invite**: Sends an email invite to join a group.
   
    Request Body:
    ```json
    {
      "email": "newuser@example.com"
    }
    ```

5. **GET /api/groups/:id/messages**: Retrieves all messages for a specific group.

6. **POST /api/groups/:id/messages**: Sends a message to the group.

    Request Body:
    ```json
    {
      "content": "Hello everyone!"
    }
    ```

## Real-Time Features with Socket.io

- **Message Notification**: When a user sends a message, it is broadcast to all other group members using Socket.io.
- **Join/Leave Notifications**: Users are notified when someone joins or leaves the group.

---

### Summary of Core Features

- **User Registration and Login** with JWT authentication.
- **Group Creation and Management** by group admins.
- **Real-Time Messaging** within groups using Socket.io.
- **Email Invitations** for joining groups.
- **Join Requests** that can be accepted or rejected by the group admin.
