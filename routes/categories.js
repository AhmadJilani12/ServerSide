// routes/categories.js
import { Router } from 'express';
import { getCategories, getCategory, createCategory, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = Router();

router.get('/', getCategories);
router.get('/:id', getCategory);
router.post('/', verifyToken, isAdmin, createCategory);
router.put('/:id', verifyToken, isAdmin, updateCategory);
router.delete('/:id', verifyToken, isAdmin, deleteCategory);

export default router;
