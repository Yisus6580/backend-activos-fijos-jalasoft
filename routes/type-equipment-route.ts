import { Router } from 'express';
import {
  createTypeEquipment,
  getAllTypeEquipment,
  getTypeEquipmentById,
  updateTypeEquipment,
} from '../controllers/type-equipment-controller';

const router = Router();

// Rutas
router.get('/', getAllTypeEquipment);
router.get('/:id', getTypeEquipmentById);
router.post('/', createTypeEquipment);
router.put('/:id', updateTypeEquipment);

export default router;
