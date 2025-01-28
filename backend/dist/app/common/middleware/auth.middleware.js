"use strict";
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
exports.isAdmin = exports.isUser = exports.auth = void 0;
const config_hepler_1 = require("../helper/config.hepler");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_errors_1 = __importDefault(require("http-errors"));
const jwt_helper_1 = require("../helper/jwt.helper");
(0, config_hepler_1.loadConfig)();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
// Middleware for role-based authentication
exports.auth = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = req.cookies.accessToken || ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", ""));
    if (!token) {
        throw (0, http_errors_1.default)(401, {
            message: "Token is required for authentication",
        });
    }
    const user = yield (0, jwt_helper_1.decodeAccessToken)(token);
    if (!user) {
        throw (0, http_errors_1.default)(401, {
            message: "Invalid or expired token",
        });
    }
    // Check if user has a valid role
    if (!user.role || !["USER", "ADMIN"].includes(user.role)) {
        throw (0, http_errors_1.default)(403, {
            message: "Invalid or unauthorized user role",
        });
    }
    req.user = user;
    next();
}));
const isUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user || user.role !== "USER") {
        next((0, http_errors_1.default)(403, "Only User can access this route"));
    }
    next();
});
exports.isUser = isUser;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    if (!user || user.role !== "ADMIN") {
        next((0, http_errors_1.default)(403, "only Admin can access this route"));
    }
    next();
});
exports.isAdmin = isAdmin;
