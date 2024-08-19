import express from "express";
import { login, register, accessToken } from "../controller/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/accessToken", accessToken);

export default router;
