import cors from "cors";
import dotenv from "dotenv";
import express, { Application, json } from "express";
import morgan from "morgan";
import { connect } from "./database";
import assignmentRoutes from "./routes/assignments-route";
import consumableRoutes from "./routes/consumable-route";
import employeeRoutes from "./routes/employee-route";
import equipmentRoutes from "./routes/equipment-route";
import furnitureRoutes from "./routes/furniture-route";
import licenseRoutes from "./routes/license-route";
import typeConsumableRoutes from "./routes/type-consumable-route";
import typeEquipmentRoutes from "./routes/type-equipment-route";
import typeFurnitureRoutes from "./routes/type-furniture-route";
import userRoutes from "./routes/user-route";

// Configuración de variables de entorno
dotenv.config();

// Conexión a la base de datos
connect();

// Configuración de la aplicación Express
const app: Application = express();
const port = process.env.PORT || 8000;

// Middleware para analizar y procesar solicitudes con cuerpo en formato JSON
app.use(json());

// Permitir peticiones desde cualquier frontend
app.use(cors({ origin: "*" }));

// Configuración del middleware Morgan para el registro de solicitudes
app.use(morgan("dev"));

// Configuración para servir las imagenes de la carpeta /images
app.use("/images", express.static("images"));

// Configuración de las rutas
app.use("/api/license", licenseRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/type-equipment", typeEquipmentRoutes);
app.use("/api/type-furniture", typeFurnitureRoutes);
app.use("/api/type-consumable", typeConsumableRoutes);
app.use("/api/furniture", furnitureRoutes);
app.use("/api/consumable", consumableRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/assignment", assignmentRoutes);
app.use("/api/user", userRoutes);

// Inicio del servidor
app.listen(port, () => {
  console.log(`Server on port: http://localhost:${port}`);
});
