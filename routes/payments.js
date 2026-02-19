// routes/payments.js
import { Router } from 'express';
import { createStripeIntent, confirmStripePayment, processCod } from '../controllers/paymentController.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.post('/stripe', verifyToken, createStripeIntent);
router.post('/stripe/confirm', verifyToken, confirmStripePayment);
router.post('/cod', verifyToken, processCod);

export default router;
