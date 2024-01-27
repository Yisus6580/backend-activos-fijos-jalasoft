import { Request, Response } from 'express';
import FurnitureModel from '../Schemas/furniture-schema';
import { IFurniture } from '../interfaces/furniture';
import { isImageValid, removeImage } from '../utils/imageFunctions';
import sendApiResponse from '../utils/send-api-response';

const maxSizeImage = 1024 * 1024 * 3; // 3 MB
const supportedImageFormats = ['image/jpeg', 'image/jpg', 'image/png'];

// Listar
export const getAllFurniture = async (req: Request, res: Response) => {
  try {
    const furniture = await FurnitureModel.find();

    return sendApiResponse<IFurniture[]>(res, 200, 'OK', furniture);
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};

// Listar por ID
export const getFurnitureById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const furniture = await FurnitureModel.findById(id);

    if (!furniture) {
      return sendApiResponse(res, 404, 'Not Found');
    }

    return sendApiResponse<IFurniture>(res, 200, 'OK', furniture);
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};

// Crear
export const createFurniture = async (req: Request, res: Response) => {
  try {
    const furnitureData: IFurniture = req.body;

    if (req.file) {
      if (!isImageValid(req, maxSizeImage, supportedImageFormats)) {
        await removeImage(res, req.file!.path);

        return sendApiResponse(
          res,
          400,
          'Invalid image: Size exceeds the limit or format is not supported'
        );
      }

      furnitureData.image = {
        baseUrl: req.file!.path,
        url: `http://localhost:8888/images${req.baseUrl}/${req.file?.filename}`,
      };
    }

    const newFurniture = await FurnitureModel.create(furnitureData);

    return sendApiResponse<IFurniture>(res, 201, 'Created', newFurniture);
  } catch (error: any) {
    if (req.file) await removeImage(res, req.file.path);
    return sendApiResponse(res, 500, error.message);
  }
};

// Editar
export const updateFurniture = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const furnitureData = req.body;
    const existingFurniture = await FurnitureModel.findById(id);

    if (!existingFurniture) {
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

      await removeImage(res, existingFurniture.image.baseUrl);

      furnitureData.image = {
        baseUrl: req.file!.path,
        url: `http://localhost:8888/images${req.baseUrl}/${req.file?.filename}`,
      };
    }

    await existingFurniture.updateOne(furnitureData);

    return sendApiResponse(res, 200, 'Updated');
  } catch (error: any) {
    if (req.file) await removeImage(res, req.file.path);
    return sendApiResponse(res, 500, error.message);
  }
};
