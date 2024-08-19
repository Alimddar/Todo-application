import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
} from "../controller/taskController.js";

const router = express.Router();

router.use(authenticateToken);

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTask);
router.delete("/:id", deleteTask);

export default router;
