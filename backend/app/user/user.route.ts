
import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as userController from "./user.controller";
import * as userValidator from "./user.validation";
import * as authMiddlerware from "../common/middleware/auth.middleware";

const router = Router();

router
        .post('/register', userValidator.registerUser, catchError, userController.registerUser)
        .post('/update-access-token', catchError, userController.updateAccessToken)
        .post('/login', userValidator.loginUser, catchError, userController.loginUser)
        .post('/logout',authMiddlerware.auth, catchError, userController.logout)
        .patch('/update-password', authMiddlerware.auth, userValidator.updatePassword, userController.updatePassword);
        
export default router;

