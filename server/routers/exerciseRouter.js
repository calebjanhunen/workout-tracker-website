import express from "express";
import bodyParser from "body-parser";

import {
    getExercises,
    getExerciseById,
    createExercise,
    deleteExercise,
} from "../controllers/exerciseController.js";

const router = express.Router();

router.post("/", bodyParser.json(), createExercise);
router.get("/", getExercises);
router.get("/:id", getExerciseById);
router.delete("/:id", deleteExercise);

export default router;
