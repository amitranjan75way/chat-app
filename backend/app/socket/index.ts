import express, { type Express } from 'express';
import http from 'http';
import { loadConfig } from '../common/helper/config.hepler';
import { Server } from 'socket.io';

loadConfig();

const app: Express = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.BASE_URL,
        credentials: true,
        optionsSuccessStatus: 204,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    }
});

// Optional: Manage online users if needed
// const onlineUser: Record<string, string> = {}; // Example object to store users

io.on("connection", (socket: any) => {
    console.log("A new User Connected ", socket.id);

    // Example: Handle online users (add logic if needed)
    // const userId = socket.handshake.query.userId;
    // if (userId) {
    //     onlineUser[userId] = socket.id;
    // }
    // io.emit("getOnlineUsers", Object.keys(onlineUser));

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        // Optional: Remove user from onlineUser list if using
        // delete onlineUser[userId];
        // io.emit("getOnlineUsers", Object.keys(onlineUser));
    });
});

// Export app, io, and server for use in index.ts
export { app, io, server };
