# Group Chat Application

## Overview

This project is a **Group Chat Application** that allows users to create and manage groups, send real-time messages, and interact with each other in a collaborative environment. The application has a **frontend** built with React.js, TypeScript, and Redux, while the **backend** is built using Express.js, TypeScript, and MongoDB with Mongoose for database management. Real-time communication between users is achieved using **Socket.io**.

Users can log in, sign up, create new groups, and participate in group chats with real-time messaging. Additionally, group admins can invite users, approve/reject join requests, and manage group settings. The system is designed to handle secure authentication with **JWT tokens** and manage user roles, such as **Admin** and **Member**.

---

## Project Features

### **Frontend (React)**

- **Authentication System**: 
  - Users can **sign up** and **log in** with their email and password.
  - Login session is managed using **JWT tokens** stored in `localStorage`.

- **Group Management**:
  - Users can **create** new groups with a name, description, and profile picture.
  - Each user can view and join groups they are invited to, using an **invite link**.
  - Group admins can approve or reject **join requests**.

- **Real-Time Messaging**:
  - Users can send and receive messages in real time via **Socket.io**.
  - Messages appear in the chat immediately after being sent by another user.
  - Each group has its own dedicated chat, displaying messages from all members.

- **User Interface**:
  - **Material UI** is used to create the user interface with a modern, responsive design.
  - **Redux** is used for global state management, handling authentication, group data, and messages.
  - **React Hook Form** and **Yup** are used for form handling and validation.

- **Real-Time Notifications**:
  - **react-toastify** is used to provide **toast notifications** for new messages, successful actions (like creating a group), and errors.

- **Mobile Responsive**: 
  - The frontend is responsive and designed for both desktop and mobile devices.

---

### **Backend (Express)**

- **Authentication**:
  - **JWT-based authentication** allows users to securely sign up and log in.
  - Passwords are hashed using **bcrypt** before being stored in the database.

- **Group and User Management**:
  - **Users** have roles (Admin, Member) and are able to create groups and send messages.
  - **Group admins** manage group memberships, approve/reject join requests, and invite new users.

- **Real-Time Communication**:
  - **Socket.io** is used to manage real-time messaging between users in a group chat.
  - The backend handles broadcasting messages to all users in a group as soon as they are sent.

- **Database**:
  - The backend uses **MongoDB** with **Mongoose** to manage the database.
  - Data is structured in **User**, **Group**, and **Message** schemas:
    - **User Schema**: Stores user information like name, email, password (hashed), profile picture, and groups.
    - **Group Schema**: Stores group details including group name, description, admin, members, and join requests.
    - **Message Schema**: Stores chat messages, including the group, sender, and content of the message.

- **Email Invitations**:
  - The backend uses **Nodemailer** to send email invitations for users to join a group.
  - Users receive email notifications when they are invited or their join request is approved/rejected.


## Installation

### **Frontend Setup**

1. Navigate to the `frontend` directory:
   
   ```bash
   cd frontend
   ```

2. Install dependencies using npm or pnpm:

   ```bash
   npm install
   ```

   or

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

### **Backend Setup**

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Install dependencies using npm or pnpm:

   ```bash
   npm install
   ```

   or

   ```bash
   pnpm install
   ```

3. Start the backend server:

   ```bash
   npm run dev
   ```

---

## Libraries and Tools

### **Frontend**:
- **React**: JavaScript library for building user interfaces.
- **Redux**: State management for React apps.
- **Socket.io-client**: Real-time messaging between clients and server.
- **Material UI**: UI component library for React.
- **Yup** & **React Hook Form**: Form validation and handling.
- **react-toastify**: Toast notifications for user feedback.

### **Backend**:
- **Express**: Web framework for Node.js.
- **Mongoose**: ODM for MongoDB.
- **Socket.io**: Real-time messaging.
- **jsonwebtoken (JWT)**: Token-based authentication.
- **bcrypt**: Password hashing.
- **Nodemailer**: Email sending for invitations and notifications.
- **dotenv**: Environment variable management.

---

## License

This project is open-source and available under the MIT License.
