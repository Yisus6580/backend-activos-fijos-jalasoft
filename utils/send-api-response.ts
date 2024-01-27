import { Response } from 'express';
import IResponse from '../interfaces/response';

const sendApiResponse = <T>(
  res: Response,
  code: number,
  message?: string | unknown,
  data?: T
) => {
  const response = createResponse<T>(code, message, data);
  res.status(code).json(response);
};

const createResponse = <T>(
  code: number,
  message: string | unknown,
  data?: T
): IResponse<T> => {
  return {
    code,
    message,
    data,
  };
};

export default sendApiResponse;
