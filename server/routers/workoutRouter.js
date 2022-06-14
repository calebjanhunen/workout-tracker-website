import express from "express";
import bodyParser from "body-parser";

import {
    createWorkout,
    getWorkouts,
} from "../controllers/workoutController.js";

const router = express.Router();

router.post("/", bodyParser.json(), createWorkout);
router.get("/", getWorkouts);

export default router;
