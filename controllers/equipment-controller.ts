import { Request, Response } from 'express';
import { IEquipment } from '../interfaces/equipment';
import sendApiResponse from '../utils/send-api-response';

import EquipmentModel from '../Schemas/equipment-schema';
import { isImageValid, removeImage } from '../utils/imageFunctions';

const maxSizeImage = 1024 * 1024 * 3; // 3 MB
const supportedImageFormats = ['image/jpeg', 'image/jpg', 'image/png'];

// Listar
export const getAllEquipment = async (req: Request, res: Response) => {
  try {
    const equipments = await EquipmentModel.find();

    return sendApiResponse<IEquipment[]>(res, 200, 'OK', equipments);
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};

// Listar por ID
export const getEquipmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const equipment = await EquipmentModel.findById(id);

    if (!equipment) {
      return sendApiResponse(res, 404, 'Not Found');
    }

    return sendApiResponse<IEquipment>(res, 200, 'OK', equipment);
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};

// Crear
export const createEquipment = async (req: Request, res: Response) => {
  try {
    const equipmentData: IEquipment = req.body;

    if (req.file) {
      if (!isImageValid(req, maxSizeImage, supportedImageFormats)) {
        await removeImage(res, req.file!.path);

        return sendApiResponse(
          res,
          400,
          'Invalid image: Size exceeds the limit or format is not supported'
        );
      }

      equipmentData.image = {
        baseUrl: req.file!.path,
        url: `http://localhost:8888/images${req.baseUrl}/${req.file?.filename}`,
      };
    }

    const newEquipment = await EquipmentModel.create(equipmentData);

    return sendApiResponse<IEquipment>(res, 201, 'Created', newEquipment);
  } catch (error: any) {
    if (req.file) await removeImage(res, req.file.path);
    return sendApiResponse(res, 500, error.message);
  }
};

// Editar
export const updateEquipment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const equipmentData = req.body;
    const existingLicense = await EquipmentModel.findById(id);

    if (!existingLicense) {
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

      await removeImage(res, existingLicense.image.baseUrl);

      equipmentData.image = {
        baseUrl: req.file!.path,
        url: `http://localhost:8888/images${req.baseUrl}/${req.file?.filename}`,
      };
    }

    await existingLicense.updateOne(equipmentData);

    return sendApiResponse(res, 200, 'Updated');
  } catch (error: any) {
    if (req.file) await removeImage(res, req.file.path);
    return sendApiResponse(res, 500, error.message);
  }
};
