import { Request, Response } from 'express';
import sendApiResponse from '../utils/send-api-response';
import TypeEquipmentModel from '../Schemas/type-equipment-schema';
import { ITypeEquipment } from '../interfaces/type-equipment';

// Listar
export const getAllTypeEquipment = async (req: Request, res: Response) => {
  try {
    const typeEquipments = await TypeEquipmentModel.find();

    return sendApiResponse<ITypeEquipment[]>(res, 200, 'OK', typeEquipments);
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};

// Listar por ID
export const getTypeEquipmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const typeEquipment = await TypeEquipmentModel.findById(id);

    if (!typeEquipment) {
      return sendApiResponse(res, 404, 'Not Found');
    }

    return sendApiResponse<ITypeEquipment>(res, 200, 'OK', typeEquipment);
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};

// Crear
export const createTypeEquipment = async (req: Request, res: Response) => {
  try {
    const typeEquipmentData = req.body;
    const newTypeEquipment = await TypeEquipmentModel.create(typeEquipmentData);

    return sendApiResponse<ITypeEquipment>(
      res,
      201,
      'Created',
      newTypeEquipment
    );
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};

// Editar
export const updateTypeEquipment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const typeEquipmentData = req.body;
    const existingTypeEquipment = await TypeEquipmentModel.findById(id);

    if (!existingTypeEquipment) {
      return sendApiResponse(res, 404, 'Not Found');
    }

    await existingTypeEquipment.updateOne(typeEquipmentData);

    return sendApiResponse(res, 200, 'Updated');
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};
