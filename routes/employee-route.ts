import { Router } from "express";
import {
  createEmployee,
  getAllEmployee,
  getEmployeeById,
  updateEmployee,
} from "../controllers/employee-controller";
import upload from "../middlewares/multer";
import { verifyToken } from "../middlewares/auth";

const router = Router();

// Rutas
router.get("/", verifyToken, getAllEmployee);
router.get("/:id", verifyToken, getEmployeeById);
router.post("/", verifyToken, upload.single("image"), createEmployee);
router.put("/:id", verifyToken, upload.single("image"), updateEmployee);

export default router;
