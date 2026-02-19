// routes/auth.js
import { Router } from 'express';
import { register, login, getMe, updateProfile } from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';
import { validateRegister, validateLogin } from '../middleware/validate.js';

const router = Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/me', verifyToken, getMe);
router.put('/profile', verifyToken, updateProfile);

export default router;
