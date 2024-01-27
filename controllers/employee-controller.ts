import { Request, Response } from 'express';
import EmployeeModel from '../Schemas/employee-schema';
import { IEmployee } from '../interfaces/employee';
import { isImageValid, removeImage } from '../utils/imageFunctions';
import sendApiResponse from '../utils/send-api-response';

const maxSizeImage = 1024 * 1024 * 3; // 3 MB
const supportedImageFormats = ['image/jpeg', 'image/jpg', 'image/png'];

// Listar
export const getAllEmployee = async (req: Request, res: Response) => {
  try {
    const employees = await EmployeeModel.find();

    return sendApiResponse<IEmployee[]>(res, 200, 'OK', employees);
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};

// Listar por ID
export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const employee = await EmployeeModel.findById(id);

    if (!employee) {
      return sendApiResponse(res, 404, 'Not Found');
    }

    return sendApiResponse<IEmployee>(res, 200, 'OK', employee);
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};

// Crear
export const createEmployee = async (req: Request, res: Response) => {
  try {
    const employeeData: IEmployee = req.body;

    if (req.file) {
      if (!isImageValid(req, maxSizeImage, supportedImageFormats)) {
        await removeImage(res, req.file!.path);

        return sendApiResponse(
          res,
          400,
          'Invalid image: Size exceeds the limit or format is not supported'
        );
      }

      employeeData.image = {
        baseUrl: req.file!.path,
        url: `http://localhost:8888/images${req.baseUrl}/${req.file?.filename}`,
      };
    }

    const newEmployee = await EmployeeModel.create(employeeData);

    return sendApiResponse<IEmployee>(res, 201, 'Created', newEmployee);
  } catch (error: any) {
    if (req.file) await removeImage(res, req.file.path);
    return sendApiResponse(res, 500, error.message);
  }
};

// Editar
export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const employeeData = req.body;
    const existingEmployee = await EmployeeModel.findById(id);

    if (!existingEmployee) {
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

      await removeImage(res, existingEmployee.image.baseUrl);

      employeeData.image = {
        baseUrl: req.file!.path,
        url: `http://localhost:8888/images${req.baseUrl}/${req.file?.filename}`,
      };
    }

    await existingEmployee.updateOne(employeeData);

    return sendApiResponse(res, 200, 'Updated');
  } catch (error: any) {
    if (req.file) await removeImage(res, req.file.path);
    return sendApiResponse(res, 500, error.message);
  }
};
