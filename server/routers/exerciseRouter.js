import express from "express";
import bodyParser from "body-parser";

import {
    getExercises,
    createExercise,
    deleteExercise,
    getExercisesByPage,
} from "../controllers/exerciseController.js";

const router = express.Router();

router.post("/", bodyParser.json(), createExercise);
router.get("/", getExercises);
router.get("/:page", getExercisesByPage);
router.delete("/:id", deleteExercise);

export default router;
