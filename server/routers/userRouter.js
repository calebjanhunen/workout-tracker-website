import express from 'express';

import {
    getUserById,
    handleRefreshToken,
    loginUser,
    logoutUser,
    registerUser,
} from '../controllers/userController.js';
import { userValidation } from '../middleware/userValidation.js';

const router = express.Router();

router.post('/register', userValidation, registerUser);
router.post('/login', userValidation, loginUser);
router.post('/logout', logoutUser);
router.get('/refresh', handleRefreshToken);
router.get('/:id', getUserById);

export default router;
