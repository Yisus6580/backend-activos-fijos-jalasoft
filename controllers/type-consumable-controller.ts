import { Request, Response } from 'express';
import sendApiResponse from '../utils/send-api-response';
import TypeConsumableModel from '../Schemas/type-consumable-schema';
import { ITypeConsumable } from '../interfaces/type-consumable';

// Listar
export const getAllTypeConsumable = async (req: Request, res: Response) => {
  try {
    const typeConsumable = await TypeConsumableModel.find();

    return sendApiResponse<ITypeConsumable[]>(res, 200, 'OK', typeConsumable);
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};

// Listar por ID
export const getTypeConsumableById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const typeConsumable = await TypeConsumableModel.findById(id);

    if (!typeConsumable) {
      return sendApiResponse(res, 404, 'Not Found');
    }

    return sendApiResponse<ITypeConsumable>(res, 200, 'OK', typeConsumable);
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};

// Crear
export const createTypeConsumable = async (req: Request, res: Response) => {
  try {
    const typeConsumableData = req.body;
    const newTypeConsumable = await TypeConsumableModel.create(
      typeConsumableData
    );

    return sendApiResponse<ITypeConsumable>(
      res,
      201,
      'Created',
      newTypeConsumable
    );
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};

// Editar
export const updateTypeConsumable = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const typeConsumableData = req.body;
    const existingTypeConsumable = await TypeConsumableModel.findById(id);

    if (!existingTypeConsumable) {
      return sendApiResponse(res, 404, 'Not Found');
    }

    await existingTypeConsumable.updateOne(typeConsumableData);

    return sendApiResponse(res, 200, 'Updated');
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};
