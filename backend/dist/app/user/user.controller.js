"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.updateAccessToken = exports.logout = exports.loginUser = exports.registerUser = void 0;
const userService = __importStar(require("./user.service"));
const response_hepler_1 = require("../common/helper/response.hepler");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_errors_1 = __importDefault(require("http-errors"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwthelper = __importStar(require("../common/helper/jwt.helper"));
const config_hepler_1 = require("../common/helper/config.hepler");
(0, config_hepler_1.loadConfig)();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
/**
 * Registers a new user.
 * @param {Request} req - The request object containing user data in the body.
 * @param {Response} res - The response object used to send the result.
 * @throws {HttpError} If the user already exists or refresh token update fails.
 */
exports.registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const isUserExist = yield userService.isUserExistByEamil(data.email);
    if (isUserExist) {
        throw (0, http_errors_1.default)(409, "User already Exits");
    }
    const result = yield userService.createUser(data);
    const payload = {
        _id: result._id,
        name: result.name,
        email: result.email,
        role: result.role,
    };
    const { refreshToken, accessToken } = jwthelper.generateTokens(payload);
    const user = yield userService.updateRefreshToken(result._id, refreshToken);
    if (!user) {
        throw (0, http_errors_1.default)(500, "Failed to update refresh token, Login to continue");
    }
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: false,
    });
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: false,
    });
    const response = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        refreshToken,
        accessToken
    };
    res.send((0, response_hepler_1.createResponse)(response, "User Registered Successfully"));
}));
/**
 * Logs in a user.
 * @param {Request} req - The request object containing email and password in the body.
 * @param {Response} res - The response object used to send the result.
 * @throws {HttpError} If the user is not found or the password is incorrect.
 */
exports.loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    let user = yield userService.getUserByEmail(data.email);
    if (!user) {
        throw (0, http_errors_1.default)(404, "User not found");
    }
    if (yield bcrypt_1.default.compare(data.password, user.password)) {
        const payload = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
        const { refreshToken, accessToken } = jwthelper.generateTokens(payload);
        const updatedUser = yield userService.updateRefreshToken(user._id, refreshToken);
        if (!updatedUser) {
            throw (0, http_errors_1.default)(500, "Failed to update refresh token, try again");
        }
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: false,
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: false,
        });
        const response = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            refreshToken,
            accessToken
        };
        res.send((0, response_hepler_1.createResponse)(response, "User logged in successfully"));
    }
    else {
        throw (0, http_errors_1.default)(401, "wrong password | Unauthorised access");
    }
}));
/**
 * Logs out a user by clearing cookies and removing the refresh token.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object used to send the result.
 * @throws {HttpError} If the user is not found.
 */
exports.logout = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        throw (0, http_errors_1.default)(401, "User not found, please login again");
    }
    const result = yield userService.deleteRefreshToken(user._id);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.send((0, response_hepler_1.createResponse)(null, "User logged out successfully"));
}));
/**
 * Updates the access token using the refresh token.
 * @param {Request} req - The request object containing the refresh token in cookies or headers.
 * @param {Response} res - The response object used to send the result.
 * @throws {HttpError} If the refresh token is not found, invalid, or the user is not found.
 */
exports.updateAccessToken = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const refreshToken = req.cookies.refreshToken || ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]);
    if (!refreshToken) {
        throw (0, http_errors_1.default)(401, "Refresh token not found");
    }
    const { valid, decoded } = jwthelper.validateToken(refreshToken, REFRESH_TOKEN_SECRET);
    if (!valid || !decoded) {
        throw (0, http_errors_1.default)(401, "Invalid refresh token, Please login again");
    }
    const payload = decoded;
    const user = yield userService.getUserById(payload._id);
    if (!user) {
        throw (0, http_errors_1.default)(404, "User not found");
    }
    const newPayload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
    const { accessToken } = jwthelper.generateTokens(newPayload);
    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });
    const response = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        refreshToken,
        accessToken
    };
    res.send((0, response_hepler_1.createResponse)(response, "Access token updated successfully"));
}));
/**
 * Change the password of the authenticated user.
 *
 * @param {Request} req - The request object containing user and body data.
 * @param {Response} res - The response object to send the result.
 * @throws {createHttpError} 404 - If the user is not found or not logged in.
 * @throws {createHttpError} 401 - If the old password is incorrect.
 * @returns {Promise<void>} - Sends a response indicating the password update status.
 */
exports.updatePassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user) {
        throw (0, http_errors_1.default)(404, "User not found, please login again");
    }
    const isUser = yield userService.getUserById(user._id);
    if (!isUser) {
        throw (0, http_errors_1.default)(404, "User not found, please login again");
    }
    const data = req.body;
    if (yield bcrypt_1.default.compare(data.oldPassword, isUser.password)) {
        const updatedUser = yield userService.updatePassword(user._id, data);
    }
    else {
        throw (0, http_errors_1.default)(401, "Incorrect old password, unauthorised access");
    }
    res.send((0, response_hepler_1.createResponse)(200, "Password updated successfully"));
}));
