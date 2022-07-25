import express from "express";
import bodyParser from "body-parser";

import {
    createWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout,
} from "../controllers/workoutController.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = express.Router();

router.post("/", verifyJWT, createWorkout);
router.get("/", verifyJWT, getWorkouts);
router.delete("/:id", verifyJWT, deleteWorkout);
router.patch("/:id", verifyJWT, updateWorkout);

export default router;
