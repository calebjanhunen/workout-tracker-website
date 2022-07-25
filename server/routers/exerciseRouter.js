import express from "express";
import bodyParser from "body-parser";

import {
    getExercises,
    getExerciseById,
    createExercise,
    deleteExercise,
} from "../controllers/exerciseController.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = express.Router();

router.post("/", verifyJWT, createExercise);
router.get("/", verifyJWT, getExercises);
router.get("/:id", verifyJWT, getExerciseById);
router.delete("/:id", verifyJWT, deleteExercise);

export default router;
