import { Response, Request } from "express";
import fs from "fs";
import sendApiResponse from "./send-api-response";

export const isImageValid = (
  req: Request,
  maxSize: number,
  allowedFormats: string[]
): boolean => {
  const { file } = req;

  if (file!.size > maxSize) return false;
  if (!allowedFormats.includes(file!.mimetype)) return false;

  return true;
};

export const removeImage = async (res: Response, path: string) => {
  if (path) {
    fs.unlink(path, (error) => {
      if (error) {
        sendApiResponse(res, 500, error.message);
      }
    });
  }
};
