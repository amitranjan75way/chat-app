import jwt from 'jsonwebtoken';
import { loadConfig } from "./config.hepler";
import createHttpError from "http-errors";
import { Payload } from '../../user/user.dto';
loadConfig();

const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET: string = process.env.REFRESH_TOKEN_SECRET as string;
const ACCESS_TOKEN_EXPIRY : string = process.env.ACCESS_TOKEN_EXPIRY as string;
const REFRESH_TOKEN_EXPIRY : string = process.env.REFRESH_TOKEN_EXPIRY as string;


export const generateTokens = (payload: Payload) => {
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
  return { accessToken, refreshToken };
};
 
export const validateToken = (token: string, secret: string) => {
  try {
    const decoded = jwt.verify(token, secret);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error };
  }
};
export const decodeAccessToken = async (encryptedAccessToken : string) => {
  // Verify token and attach the user information to the request object
  const payload: Payload = jwt.verify(encryptedAccessToken, ACCESS_TOKEN_SECRET) as Payload;
  console.log("Payload is : ", payload)
  if (payload === null) {
      throw createHttpError(403, {
      message: "Invalid Token...",
      });
  }

  return payload;
}

