import express from "express";

import {
    registerUser,
    loginUser,
    logoutUser,
    handleRefreshToken,
} from "../controllers/userController.js";
import { userValidation } from "../middleware/userValidation.js";

const router = express.Router();

router.post("/register", userValidation, registerUser);
router.post("/login", userValidation, loginUser);
router.post("/logout", logoutUser);
router.get("/refresh", handleRefreshToken);

export default router;
