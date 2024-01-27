import { Router } from 'express';
import {
  createConsumable,
  getAllConsumable,
  getConsumableById,
  updateConsumable,
} from '../controllers/consumable-controller';
import upload from '../middlewares/multer';

const router = Router();

// Rutas
router.get('/', getAllConsumable);
router.get('/:id', getConsumableById);
router.post('/', upload.single('image'), createConsumable);
router.put('/:id', upload.single('image'), updateConsumable);

export default router;
