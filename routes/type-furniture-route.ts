import { Router } from 'express';
import {
  createTypeFurniture,
  getAllTypeFurniture,
  getTypeFurnitureById,
  updateTypeFurniture,
} from '../controllers/type-furniture-controller';

const router = Router();

// Rutas
router.get('/', getAllTypeFurniture);
router.get('/:id', getTypeFurnitureById);
router.post('/', createTypeFurniture);
router.put('/:id', updateTypeFurniture);

export default router;
