

import { ObjectId } from 'mongodb';

export interface IResult<T> {
    id?: string;
    data?: T;
    message?: string;
    modelState?: any;
    success: boolean;
    url?: string;
}

export interface IModelo {
    _id?: ObjectId;
}

