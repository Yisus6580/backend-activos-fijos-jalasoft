import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import sendApiResponse from "../utils/send-api-response";
import UserModel from "../Schemas/user-schema";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Verificamos si llego los headers de autorización
  if (!req.headers.authorization) {
    return sendApiResponse(res, 401, "Unauthorized 1");
  }

  // Extraemos el token
  const token = req.headers.authorization.split(" ")[1];

  // Verificamos que el token tenga contenido
  if (!token) {
    return sendApiResponse(res, 401, "Unauthorized 2");
  }

  jwt.verify(token, process.env.SECRET_JWT!, async (error, payload) => {
    // Verificamos que el token sea valido
    if (error) {
      return sendApiResponse(res, 401, "Unauthorized 3");
    }

    // Extraemos el id del payload
    const { _id }: any = payload;

    // Buscamos el documento por el id
    const item = await UserModel.findById(_id);

    // Verificamos si existe el documento
    if (!item) {
      return sendApiResponse(res, 404, "Not Found");
    }

    // Asignamos el id a req.userId
    req.userId = _id;

    // Continuamos con el controlador
    next();
  });
};
