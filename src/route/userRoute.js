import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import {
  getUser,
  updateUser,
  deleteUser,
} from "../controller/userController.js";

const router = express.Router();

router.use(authenticateToken);

router.get("/", getUser);
router.put("/", updateUser);
router.delete("/", deleteUser);

export default router;
