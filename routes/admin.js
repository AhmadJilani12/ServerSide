// routes/admin.js
import { Router } from 'express';
import { getStats, getUsers, updateUser, deleteUser, getAllOrders } from '../controllers/adminController.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = Router();

router.use(verifyToken, isAdmin);

router.get('/stats', getStats);
router.get('/users', getUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.get('/orders', getAllOrders);

export default router;