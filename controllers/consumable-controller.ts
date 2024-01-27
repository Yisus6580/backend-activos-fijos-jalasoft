import { Request, Response } from 'express';
import ConsumableModel from '../Schemas/consumable-schema';
import { IConsumable } from '../interfaces/consumables';
import { isImageValid, removeImage } from '../utils/imageFunctions';
import sendApiResponse from '../utils/send-api-response';

const maxSizeImage = 1024 * 1024 * 3; // 3 MB
const supportedImageFormats = ['image/jpeg', 'image/jpg', 'image/png'];

// Listar
export const getAllConsumable = async (req: Request, res: Response) => {
  try {
    const consumables = await ConsumableModel.find();

    return sendApiResponse<IConsumable[]>(res, 200, 'OK', consumables);
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};

// Listar por ID
export const getConsumableById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const consumable = await ConsumableModel.findById(id);

    if (!consumable) {
      return sendApiResponse(res, 404, 'Not Found');
    }

    return sendApiResponse<IConsumable>(res, 200, 'OK', consumable);
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};

// Crear
export const createConsumable = async (req: Request, res: Response) => {
  try {
    const consumableData: IConsumable = req.body;

    if (req.file) {
      if (!isImageValid(req, maxSizeImage, supportedImageFormats)) {
        await removeImage(res, req.file!.path);

        return sendApiResponse(
          res,
          400,
          'Invalid image: Size exceeds the limit or format is not supported'
        );
      }

      consumableData.image = {
        baseUrl: req.file!.path,
        url: `http://localhost:8888/images${req.baseUrl}/${req.file?.filename}`,
      };
    }

    const newConsumable = await ConsumableModel.create(consumableData);

    return sendApiResponse<IConsumable>(res, 201, 'Created', newConsumable);
  } catch (error: any) {
    if (req.file) await removeImage(res, req.file.path);
    return sendApiResponse(res, 500, error.message);
  }
};

// Editar
export const updateConsumable = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const consumableData = req.body;
    const existingConsumable = await ConsumableModel.findById(id);

    if (!existingConsumable) {
      if (req.file) await removeImage(res, req.file.path);
      return sendApiResponse(res, 404, 'Not Found');
    }

    if (req.file) {
      if (!isImageValid(req, maxSizeImage, supportedImageFormats)) {
        await removeImage(res, req.file!.path);

        return sendApiResponse(
          res,
          400,
          'Invalid image: Size exceeds the limit or format is not supported'
        );
      }

      await removeImage(res, existingConsumable.image.baseUrl);

      consumableData.image = {
        baseUrl: req.file!.path,
        url: `http://localhost:8888/images${req.baseUrl}/${req.file?.filename}`,
      };
    }

    await existingConsumable.updateOne(consumableData);

    return sendApiResponse(res, 200, 'Updated');
  } catch (error: any) {
    if (req.file) await removeImage(res, req.file.path);
    return sendApiResponse(res, 500, error.message);
  }
};
