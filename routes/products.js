// routes/products.js
import { Router } from 'express';
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct, uploadImages } from '../controllers/productController.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', verifyToken, isAdmin, uploadImages, createProduct);
router.put('/:id', verifyToken, isAdmin, uploadImages, updateProduct);
router.delete('/:id', verifyToken, isAdmin, deleteProduct);

export default router;

