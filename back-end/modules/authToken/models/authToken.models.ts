
import { IModelo } from "../../../tools/generic/generic.interfaces";

export const APIAuthToken = "authToken";

export interface IAuthToken extends IModelo {
    userID: Object;
    token: string;
    valido: boolean;
};

