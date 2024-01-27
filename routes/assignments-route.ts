import { Router } from "express";

import {
  createAssignment,
  getAllActives,
  getAllAssignment,
  getAssignmentById,
  updateAssignment,
} from "../controllers/assignments-controller";
import { verifyToken } from "../middlewares/auth";

const router = Router();

// Rutas
router.get("/", verifyToken, getAllAssignment);
router.get("/all-actives", getAllActives);
router.get("/:id", verifyToken, getAssignmentById);
router.post("/", verifyToken, createAssignment);
router.put("/:id", verifyToken, updateAssignment);

export default router;
