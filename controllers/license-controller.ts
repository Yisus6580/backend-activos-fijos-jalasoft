import { Request, Response } from "express";
import { ILicense } from "../interfaces/license";
import LicenseModel from "../Schemas/license-schema";
import sendApiResponse from "../utils/send-api-response";

// Listar
export const getAllLicenses = async (req: Request, res: Response) => {
  try {
    const licenses = await LicenseModel.find();

    return sendApiResponse<ILicense[]>(res, 200, "OK", licenses);
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};

// Listar por ID
export const getLicenseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const license = await LicenseModel.findById(id);

    if (!license) {
      return sendApiResponse(res, 404, "Not Found");
    }

    return sendApiResponse<ILicense>(res, 200, "OK", license);
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};

// Crear
export const createLicense = async (req: Request, res: Response) => {
  try {
    const licenseData = req.body;

    console.log("Esta es la data de licnecia: ", licenseData);
    const newLicense = await LicenseModel.create(licenseData);

    return sendApiResponse<ILicense>(res, 201, "Created", newLicense);
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};

// Editar
export const updateLicense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const licenseData = req.body;
    const existingLicense = await LicenseModel.findById(id);

    if (!existingLicense) {
      return sendApiResponse(res, 404, "Not Found");
    }

    await existingLicense.updateOne(licenseData);

    return sendApiResponse(res, 200, "Updated");
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};
