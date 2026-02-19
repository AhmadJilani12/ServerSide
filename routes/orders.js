// routes/orders.js
import { Router } from 'express';
import { createOrder, getMyOrders, getOrder, updateOrderStatus } from '../controllers/orderController.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';
import { validateOrder } from '../middleware/validate.js';

const router = Router();

router.post('/', verifyToken, validateOrder, createOrder);
router.get('/me', verifyToken, getMyOrders);
router.get('/:id', verifyToken, getOrder);
router.put('/:id/status', verifyToken, isAdmin, updateOrderStatus);

export default router;

