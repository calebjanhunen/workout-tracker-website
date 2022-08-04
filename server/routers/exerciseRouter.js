import bodyParser from 'body-parser';
import express from 'express';

import {
    createExercise,
    deleteExercise,
    getExerciseById,
    getExercises,
    updateExercise,
} from '../controllers/exerciseController.js';
import { verifyJWT } from '../middleware/verifyJWT.js';

const router = express.Router();

router.post('/', verifyJWT, createExercise);
router.get('/', verifyJWT, getExercises);
router.get('/:id', verifyJWT, getExerciseById);
router.patch('/:id', verifyJWT, updateExercise);
router.delete('/:id', verifyJWT, deleteExercise);

export default router;
