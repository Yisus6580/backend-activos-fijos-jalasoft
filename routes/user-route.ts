import { Router } from "express";
import {
  createUser,
  getAllUser,
  getUserById,
  login,
  updateUser,
} from "../controllers/user-controller";
import upload from "../middlewares/multer";
import { verifyToken } from "../middlewares/auth";

const router = Router();

// Rutas
router.get("/", getAllUser);
router.get("/:id", getUserById);
router.post("/", upload.single("image"), createUser);
router.put("/:id", upload.single("image"), updateUser);
router.post("/login", login);
export default router;
