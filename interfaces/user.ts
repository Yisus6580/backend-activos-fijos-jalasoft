import { ImageType } from "./global-types";

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  role: TypeRols;
  image: ImageType;
  token: string;
  verifyToken: string;
  state: boolean;
}

type TypeRols = "admin" | "attendant";
