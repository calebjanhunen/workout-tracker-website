import express from "express";

import {
    createWorkoutTemplate,
    getWorkoutTemplates,
    deleteWorkoutTemplate,
} from "../controllers/workoutTemplateController.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = express.Router();

router.post("/", verifyJWT, createWorkoutTemplate);
router.get("/", verifyJWT, getWorkoutTemplates);
router.delete("/", verifyJWT, deleteWorkoutTemplate);

export default router;
