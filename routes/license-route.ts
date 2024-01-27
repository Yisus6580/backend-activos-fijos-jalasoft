import { Router } from "express";
import {
  getAllLicenses,
  getLicenseById,
  createLicense,
  updateLicense,
} from "../controllers/license-controller";
import { verifyToken } from "../middlewares/auth";

const router = Router();

// Rutas
router.get("/", verifyToken, getAllLicenses);
router.get("/:id", verifyToken, getLicenseById);
router.post("/", verifyToken, createLicense);
router.put("/:id", verifyToken, updateLicense);

export default router;
