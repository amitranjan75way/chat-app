import express, { type Express, type Request, type Response } from "express";
import { server, app } from './app/socket/index'; // Adjusted import
import bodyParser from "body-parser";
import morgan from "morgan";
import http from "http";
import cookieParser from "cookie-parser";
import cors from 'cors';

import { initDB } from "./app/common/services/database.service";
import { initPassport } from "./app/common/services/passport-jwt.service";
import { loadConfig } from "./app/common/helper/config.hepler";
import { type IUser } from "./app/user/user.dto";
import errorHandler from "./app/common/middleware/error-handler.middleware";
import routes from "./app/routes";
import swaggerUi from "swagger-ui-express";
import apiLimiter from "./app/common/middleware/rate-limit.middleware";

loadConfig();

declare global {
  namespace Express {
    interface User extends Omit<IUser, "password"> {}
    interface Request {
      user?: User;
    }
  }
}

const port = Number(process.env.PORT) ?? 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors({
  origin: process.env.BASE_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
}));

import swaggerDocument from "./app/swagger/swagger";

const initApp = async (): Promise<void> => {
  // Initialize database
  await initDB();

  // Passport initialization
  initPassport();

  // Set base path to /api
  app.use("/api", apiLimiter, routes);

  app.get("/", (req: Request, res: Response) => {
    res.send(`<h1>Chat app is Running</h1>`);
  });

  // Set up Swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Error handler middleware
  app.use(errorHandler);

  // Start server on the same port as HTTP server
  server.listen(port, () => {
    console.log("Server is running on port", port);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
  });
};

void initApp();
