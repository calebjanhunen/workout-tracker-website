import express from "express";
import bodyParser from "body-parser";

import {
    createWorkoutTemplate,
    getWorkoutTemplates,
    deleteWorkoutTemplate,
} from "../controllers/workoutTemplateController.js";

const router = express.Router();

router.post("/", bodyParser.json(), createWorkoutTemplate);
router.get("/", getWorkoutTemplates);
router.delete("/", deleteWorkoutTemplate);

export default router;
