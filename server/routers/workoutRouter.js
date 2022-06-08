import express from "express";
import bodyParser from "body-parser";

import { createWorkout } from "../controllers/workoutController.js";

const router = express.Router();

router.post("/", bodyParser.json(), createWorkout);

export default router;
