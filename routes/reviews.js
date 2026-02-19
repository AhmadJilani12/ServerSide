// routes/reviews.js
import { Router } from 'express';
import { createReview, getProductReviews, deleteReview } from '../controllers/reviewController.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.post('/', verifyToken, createReview);
router.get('/:productId', getProductReviews);
router.delete('/:id', verifyToken, deleteReview);

export default router;
