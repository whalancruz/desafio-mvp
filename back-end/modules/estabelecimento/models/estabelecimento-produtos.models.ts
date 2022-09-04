
import mongoose from 'mongoose';
import { IModelo } from "../../../tools/generic/generic.interfaces";
import { ObjectId } from 'mongodb';


export const APIEstabelecimentoProdutos = "estabelecimento-produtos";

export interface IEstabelecimentoProdutos extends IModelo {
  estabelecimentoCategoriaID: ObjectId;
  imagemFundo: string;
  nome: string;
  descricao: string;
  price: number;
};

export interface IEstabelecimentoProdutosLista {
  categoria: string;
  produtos: IEstabelecimentoProdutos[];
};


export const SMEstabelecimentoProdutos = new mongoose.Schema({
  nome: {
    type: 'String',
    index: true
  },
  descricao: {
    type: 'String',
    index: true
  },
}, { versionKey: false });

export const mongoEstabelecimentoProduto = mongoose.model(APIEstabelecimentoProdutos, SMEstabelecimentoProdutos);