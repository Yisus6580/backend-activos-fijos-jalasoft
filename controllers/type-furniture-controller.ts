import { Request, Response } from 'express';
import sendApiResponse from '../utils/send-api-response';
import TypeFurnitureModel from '../Schemas/type-furniture-schema';
import { ITypeFurniture } from '../interfaces/type-furniture';

// Listar
export const getAllTypeFurniture = async (req: Request, res: Response) => {
  try {
    const typeFurniture = await TypeFurnitureModel.find();

    return sendApiResponse<ITypeFurniture[]>(res, 200, 'OK', typeFurniture);
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};

// Listar por ID
export const getTypeFurnitureById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const typeFurniture = await TypeFurnitureModel.findById(id);

    if (!typeFurniture) {
      return sendApiResponse(res, 404, 'Not Found');
    }

    return sendApiResponse<ITypeFurniture>(res, 200, 'OK', typeFurniture);
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};

// Crear
export const createTypeFurniture = async (req: Request, res: Response) => {
  try {
    const typeFurnitureData = req.body;
    const newTypeFurniture = await TypeFurnitureModel.create(typeFurnitureData);

    return sendApiResponse<ITypeFurniture>(
      res,
      201,
      'Created',
      newTypeFurniture
    );
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};

// Editar
export const updateTypeFurniture = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const typeFurnitureData = req.body;
    const existingTypeFurniture = await TypeFurnitureModel.findById(id);

    if (!existingTypeFurniture) {
      return sendApiResponse(res, 404, 'Not Found');
    }

    await existingTypeFurniture.updateOne(typeFurnitureData);

    return sendApiResponse(res, 200, 'Updated');
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};
