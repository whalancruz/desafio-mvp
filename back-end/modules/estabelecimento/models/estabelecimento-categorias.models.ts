
import { IModelo } from "../../../tools/generic/generic.interfaces";
import { ObjectId } from 'mongodb';

export const APIEstabelecimentoCategorias = "estabelecimento-categorias";

export interface IEstabelecimentoCategorias extends IModelo {
  estabelecimentoID: ObjectId;
  categoria: string;
};

