import express from "express";

import { registerUser, loginUser } from "../controllers/userController.js";
import { userValidation } from "../middleware/userValidation.js";

const router = express.Router();

router.post("/register", userValidation, registerUser);
router.post("/login", userValidation, loginUser);

export default router;
