import { Request, Response } from "express";
import { Model } from "mongoose";
import AssignmentsModel from "../Schemas/assignment-schema";
import ConsumableModel from "../Schemas/consumable-schema";
import EquipmentModel from "../Schemas/equipment-schema";
import FurnitureModel from "../Schemas/furniture-schema";
import LicenseModel from "../Schemas/license-schema";
import { IAssignment } from "../interfaces/assignment";
import sendApiResponse from "../utils/send-api-response";

// Listar
export const getAllAssignment = async (req: Request, res: Response) => {
  try {
    const assignments = await AssignmentsModel.find();

    return sendApiResponse<IAssignment[]>(res, 200, "OK", assignments);
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};

// Listar Select Actives
export const getAllActives = async (req: Request, res: Response) => {
  try {
    const models = [
      ConsumableModel,
      EquipmentModel,
      FurnitureModel,
      LicenseModel,
    ];
    const formattedObjects = await getAllFormattedObjects(models);

    return sendApiResponse<FormattedObject[]>(res, 200, "OK", formattedObjects);
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};

// Listar por ID
export const getAssignmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const assignment = await AssignmentsModel.findById(id);

    if (!assignment) {
      return sendApiResponse(res, 404, "Not Found");
    }

    return sendApiResponse<IAssignment>(res, 200, "OK", assignment);
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};

// Crear
export const createAssignment = async (req: Request, res: Response) => {
  try {
    const assignmentData = req.body;
    const newAssignment = await AssignmentsModel.create(assignmentData);

    return sendApiResponse<IAssignment>(res, 201, "Created", newAssignment);
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};

// Editar
export const updateAssignment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const assignmentData = req.body;
    const existingAsignment = await AssignmentsModel.findById(id);

    if (!existingAsignment) {
      return sendApiResponse(res, 404, "Not Found");
    }

    await existingAsignment.updateOne(assignmentData);

    return sendApiResponse(res, 200, "Updated");
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};

interface FormattedObject {
  _id: string;
  code: string;
  name: string;
}

// Función genérica para obtener todos los objetos de diferentes modelos y formatearlos
const getAllFormattedObjects = async (
  models: Model<any>[]
): Promise<FormattedObject[]> => {
  try {
    const formattedObjects: FormattedObject[] = [];

    for (const model of models) {
      const objects = await model.find();

      // Realizar la transformación necesaria para cada tipo de objeto
      objects.forEach((obj) => {
        if ("type" in obj) {
          // Para IConsumable
          formattedObjects.push({
            _id: obj._id,
            code: obj._id,
            name: obj._type,
          });
        } else if ("code" in obj && "supplier" in obj) {
          // Para IFurniture
          formattedObjects.push({
            _id: obj._id,
            code: obj.code,
            name: obj.type,
          });
        } else if ("name" in obj) {
          // Para ILicense
          formattedObjects.push({
            _id: obj._id, // Aquí deberías proporcionar un ID para la licencia
            code: obj._id,
            name: obj.name,
          });
        } else {
          // Para IEquipment u otros tipos
          formattedObjects.push({
            _id: obj._id, // Proporciona un ID por defecto si es necesario
            code: obj._id,
            name: obj.type,
          });
        }
      });
    }

    return formattedObjects;
  } catch (error) {
    throw error;
  }
};
