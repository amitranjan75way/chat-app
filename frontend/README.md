
# Frontend README for Group Chat Application

## Overview

This frontend is built using React.js, TypeScript, and various state management tools. It provides a user interface for logging in, signing up, managing groups, chatting in groups, and sending/receiving real-time messages using Socket.io.

## Prerequisites

- Node.js and npm (or pnpm) installed
- Vite for building and serving the project

## Installation

1. Clone the repository to your local machine.
2. Navigate to the frontend folder.

    ```bash
    cd path/to/frontend
    ```

3. Install the dependencies using either npm or pnpm:

    ```bash
    npm install
    ```

    or

    ```bash
    pnpm install
    ```

## Available Scripts

- **`dev`**: Starts the development server using Vite.
  
    ```bash
    npm run dev
    ```

- **`build`**: Builds the project for production.
  
    ```bash
    npm run build
    ```

- **`lint`**: Lints the code using ESLint.

    ```bash
    npm run lint
    ```

- **`preview`**: Previews the production build.

    ```bash
    npm run preview
    ```

## Frontend Structure

### 1. **Authentication Pages**
   - **Login**: Users can log in with their email and password. Upon successful login, the user is redirected to the dashboard or the chat page.
   - **Signup**: Users can sign up with their name, email, and password. After signing up, they are redirected to the login page.

### 2. **Chat Pages**
   - **Group List**: A list of groups the user is a part of. Each group shows the group name, description, and a link to the group’s chat.
   - **Group Chat**: Displays the chat for the selected group. Users can:
     - Send messages.
     - See messages from others in real time.
     - See a list of members in the group.
     - Join the group if not already a member (for groups with open join requests).
   - **Create Group**: Users can create a new group by providing a name, description, and an optional profile picture.

### 3. **Real-Time Messaging with Socket.io**
   - Users can send messages in real time to groups, and see other members' messages immediately after they are sent.
   - **Socket.io-client** is used to establish a connection to the backend for real-time updates (e.g., new messages).

### 4. **Group Management**
   - **Create Group**: Allows users to create a new group. The group admin can invite users via a link and approve or reject join requests.
   - **Join Requests**: If the user is not yet a member of a group, they will see a “Join Request” button that they can click to request to join the group.

### 5. **Notifications and Toasts**
   - Users are notified about new messages, group join requests, and other real-time events using **react-toastify**.

### 6. **State Management**
   - **Redux** is used to manage the global state, such as storing user details, groups, and messages.
   - **React Hook Form** is used to handle forms like login, signup, and group creation efficiently.

### 7. **UI Components**
   - **Material UI** is used for designing the UI components, including buttons, inputs, and dialog boxes.
   - **Emotion** is used for styled components and theming.

## Example Pages

1. **Login Page**
   - A form where users can log in with their email and password.
   - The form uses **React Hook Form** for managing the form state and **Yup** for validation.

2. **Signup Page**
   - A form where users can sign up by entering their name, email, and password.

3. **Group List Page**
   - Displays a list of groups the user is a member of. Each group is clickable, leading to the group’s chat page.
   - Includes options for creating a new group and viewing group details.

4. **Group Chat Page**
   - Displays the chat messages of the selected group. New messages appear in real-time as they are sent.
   - Includes a message input area at the bottom, with options to send messages.
   - Displays a list of group members, and if the user is not a member, shows a “Join Request” button.

5. **Create Group Page**
   - A form for creating a new group with a name, description, and optional profile picture.

## Code Overview

### 1. **State Management**
   - **Redux** stores the state for authentication (user login), groups, and chat messages.
   - **Socket.io** updates the group chat in real time, sending and receiving messages to/from the backend.

### 2. **Authentication Logic**
   - On login, the user's JWT token is stored in localStorage.
   - The token is included in the request headers when calling protected routes on the backend to fetch group data and chat messages.

### 3. **Real-Time Updates**
   - **Socket.io-client** connects to the backend and listens for new messages. When a new message is received, it is immediately displayed in the group chat.

### 4. **Toast Notifications**
   - Toast notifications are displayed using **react-toastify** to notify the user of new messages, successful group creation, or errors.

## Libraries and Tools Used

- **React**: JavaScript library for building user interfaces.
- **TypeScript**: Strongly typed JavaScript.
- **Redux**: For state management.
- **Socket.io-client**: For real-time chat functionality.
- **Material UI**: For styled components.
- **react-toastify**: For toast notifications.
- **Yup**: For form validation.
- **React Hook Form**: For managing forms.
- **Emotion**: For styled components and custom theming.
- **Vite**: Next-generation, fast build tool.
