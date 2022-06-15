import express from "express";
import bodyParser from "body-parser";

import {
    createWorkout,
    getWorkouts,
    deleteWorkout,
} from "../controllers/workoutController.js";

const router = express.Router();

router.post("/", bodyParser.json(), createWorkout);
router.get("/", getWorkouts);
router.delete("/:id", deleteWorkout);

export default router;
