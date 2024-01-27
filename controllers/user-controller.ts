import { Request, Response } from "express";
import bcrypt from "bcrypt";
import sendApiResponse from "../utils/send-api-response";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { isImageValid, removeImage } from "../utils/imageFunctions";
import UserModel from "../Schemas/user-schema";
import { IUser } from "../interfaces/user";

const maxSizeImage = 1024 * 1024 * 3; // 3 MB
const supportedImageFormats = ["image/jpeg", "image/jpg", "image/png"];

// Configuración de Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nonameggg000@gmail.com",
    pass: "sgvrphhokatbdukd",
  },
});

// Listar
export const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();

    return sendApiResponse<IUser[]>(res, 200, "OK", users);
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};

// Listar por ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);

    if (!user) {
      return sendApiResponse(res, 404, "Not Found");
    }

    return sendApiResponse<IUser>(res, 200, "OK", user);
  } catch (error: any) {
    return sendApiResponse(res, 500, error.message);
  }
};

// Crear
export const createUser = async (req: Request, res: Response) => {
  try {
    const userData: IUser = req.body;

    if (req.file) {
      if (!isImageValid(req, maxSizeImage, supportedImageFormats)) {
        await removeImage(res, req.file!.path);

        return sendApiResponse(
          res,
          400,
          "Invalid image: Size exceeds the limit or format is not supported"
        );
      }

      userData.image = {
        baseUrl: req.file!.path,
        url: `http://localhost:8888/images${req.baseUrl}/${req.file?.filename}`,
      };
    }

    // Verificamos si el email ya esta registrado
    const isEmailInUsed = await UserModel.findOne({ email: userData.email });

    if (isEmailInUsed) {
      if (req.file) {
        await removeImage(res, req.file.path);
      }
      return sendApiResponse(res, 400, "Email in use");
    }

    // Encriptamos la contraseña
    userData.password = await bcrypt.hash(userData.password, 10);

    // Creamos un nuevo documento mandando la data
    // Y tambien nos devolvera el nuevo documento creado
    const newUser = await UserModel.create(userData);

    // Creamos el token
    const token = jwt.sign({ _id: newUser._id }, process.env.SECRET_JWT!);

    return sendApiResponse<IUser>(res, 201, "Created", {
      ...newUser.toObject(),
      token,
    });
  } catch (error: any) {
    if (req.file) await removeImage(res, req.file.path);
    return sendApiResponse(res, 500, error.message);
  }
};

// Editar
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const existingUser = await UserModel.findById(id);

    if (!existingUser) {
      if (req.file) await removeImage(res, req.file.path);
      return sendApiResponse(res, 404, "Not Found");
    }

    if (req.file) {
      if (!isImageValid(req, maxSizeImage, supportedImageFormats)) {
        await removeImage(res, req.file!.path);

        return sendApiResponse(
          res,
          400,
          "Invalid image: Size exceeds the limit or format is not supported"
        );
      }

      await removeImage(res, existingUser.image.baseUrl);

      userData.image = {
        baseUrl: req.file!.path,
        url: `http://localhost:8888/images${req.baseUrl}/${req.file?.filename}`,
      };
    }

    await existingUser.updateOne(userData);

    return sendApiResponse(res, 200, "Updated");
  } catch (error: any) {
    if (req.file) await removeImage(res, req.file.path);
    return sendApiResponse(res, 500, error.message);
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  try {
    // Data mandada desde el body
    const userData: IUser = req.body;

    // Documento obtenido por el email desde la db
    const isUserFound = await UserModel.findOne({ email: userData.email });

    // Verificamos si encontró el documento
    if (!isUserFound) {
      return sendApiResponse(res, 404, "Email y/o contraseña incorrectos");
    }

    // Verificamos si encontró el documento
    if (!isUserFound.state) {
      return sendApiResponse(res, 404, "Usuario inactivo");
    }

    // Comparamos las contraseña ingresada con la contraseña guardada
    const match = await bcrypt.compare(
      userData.password,
      isUserFound.password!
    );

    if (match) {
      // Creamos el token
      const token = jwt.sign({ _id: isUserFound._id }, process.env.SECRET_JWT!);

      // Mandamos la respuesta con la data del nuevo documento junto al token
      return sendApiResponse<IUser>(res, 200, "Success", {
        ...isUserFound.toObject(),
        token,
      });
    }

    // Mandamos la respuesta en caso de que la contraseña sea incorrecta
    return sendApiResponse(res, 400, "Email y/o contraseña incorrectos");
  } catch (error: any) {
    // Mandamos el error capturado
    sendApiResponse(res, 500, error.message);
  }
};
