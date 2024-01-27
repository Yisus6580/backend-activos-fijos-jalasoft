import { Router } from 'express';
import {
  createTypeConsumable,
  getAllTypeConsumable,
  getTypeConsumableById,
  updateTypeConsumable,
} from '../controllers/type-consumable-controller';

const router = Router();

// Rutas
router.get('/', getAllTypeConsumable);
router.get('/:id', getTypeConsumableById);
router.post('/', createTypeConsumable);
router.put('/:id', updateTypeConsumable);

export default router;
