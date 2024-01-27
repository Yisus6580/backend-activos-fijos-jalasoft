import { Router } from 'express';
import {
  createEquipment,
  getAllEquipment,
  getEquipmentById,
  updateEquipment,
} from '../controllers/equipment-controller';
import upload from '../middlewares/multer';

const router = Router();

// Rutas
router.get('/', getAllEquipment);
router.get('/:id', getEquipmentById);
router.post('/', upload.single('image'), createEquipment);
router.put('/:id', upload.single('image'), updateEquipment);

export default router;
