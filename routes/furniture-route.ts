import { Router } from 'express';
import {
  createFurniture,
  getAllFurniture,
  getFurnitureById,
  updateFurniture,
} from '../controllers/furniture-controller';
import upload from '../middlewares/multer';

const router = Router();

// Rutas
router.get('/', getAllFurniture);
router.get('/:id', getFurnitureById);
router.post('/', upload.single('image'), createFurniture);
router.put('/:id', upload.single('image'), updateFurniture);

export default router;
