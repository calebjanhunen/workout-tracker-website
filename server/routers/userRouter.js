import express from "express";

import { createUser } from "../controllers/userController.js";
import { userValidation } from "../middleware/userValidation.js";

const router = express.Router();

router.post("/register", userValidation, createUser);

export default router;
