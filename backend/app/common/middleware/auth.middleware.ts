import { loadConfig } from "../helper/config.hepler";
import { type NextFunction, type Request, type Response } from "express";
import asyncHandler from "express-async-handler";
import createHttpError from "http-errors";
import { Payload, type IUser } from "../../user/user.dto";
import UserSchema from "../../user/user.schema";
import { decodeAccessToken } from "../helper/jwt.helper";

loadConfig();
const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET as string;


// Middleware for role-based authentication
export const auth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    const token = req.cookies.accessToken || req.headers.authorization?.replace("Bearer ", "");
    
    if (!token) {
      throw createHttpError(401, {
        message: "Token is required for authentication",
      });
    }
    
    const user = await decodeAccessToken(token);
    console.log("auth payload : ", user)
    if (!user) {
      throw createHttpError(401, {
        message: "Invalid or expired token",
      });
    }
    // Check if user has a valid role
    if (!user.role || !["USER", "ADMIN"].includes(user.role)) {
      throw createHttpError(403, {
        message: "Invalid or unauthorized user role",
      });
    }

    req.user = user as any;
    next();
  }
);

export const isUser = async(req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user || user.role !== "USER") {
    next(createHttpError(403, "Only User can access this route"));
  }
  next();
};

export const isAdmin = async(req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user || user.role !== "ADMIN") {
    next(createHttpError(403, "only Admin can access this route"));
  }
  next();
};
