import express from "express";
import authRoutes from "./authRoute.js";
import taskRoutes from "./taskRoute.js";
import userRoutes from "./userRoute.js";

const router = express.Router();

// Auth routes
router.use("/auth", authRoutes);

// Task routes
router.use("/tasks", taskRoutes);

// User routes
router.use("/users", userRoutes);

export default router;
