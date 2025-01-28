import express from "express";
import userRoutes from "./user/user.route";
import groupRoutes from './group/group.route';

// routes
const router = express.Router();

router.use("/users", userRoutes);
router.use("/group", groupRoutes);


export default router;