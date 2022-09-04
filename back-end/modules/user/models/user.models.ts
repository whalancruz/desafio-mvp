
import { IModelo } from "../../../tools/generic/generic.interfaces";

export const APIUser = "user";

export interface IUser extends IModelo {
  nome: string;
  endereco: string;
  email: string;
  password?: string;
};

export interface IUserLogin {
  email: string;
  password: string;
};

