import express from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as authMiddlerware from "../common/middleware/auth.middleware";
import * as groupValidation from "./group.validation";
import * as groupController from "./group.controllers";

const router = express.Router();

router
    .post('/create', authMiddlerware.auth, groupValidation.createGroup, catchError, groupController.createGroup)
    .post('/send-invite/:groupId', authMiddlerware.auth, groupValidation.sendInviteLink, groupController.sendInviteLink)
    .post('/accept/:inviteId', authMiddlerware.auth, groupValidation.acceptInvite, groupController.acceptInviteLink)
    .post('/message/send/:groupId', authMiddlerware.auth, groupValidation.sendMessage, catchError, groupController.sendMessage)
    .get('/messages/:groupId', authMiddlerware.auth, catchError, groupController.getMessages)
    .get('/', groupController.getAllgroup)
export default router;