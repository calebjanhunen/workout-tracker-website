import express from "express";
import bodyParser from "body-parser";

import {
    createWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout,
} from "../controllers/workoutController.js";

const router = express.Router();

router.post("/", bodyParser.json(), createWorkout);
router.get("/", getWorkouts);
router.delete("/:id", deleteWorkout);
router.patch("/:id", bodyParser.json(), updateWorkout);

export default router;
