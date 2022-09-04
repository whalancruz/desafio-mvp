
import { IModelo } from "../../../tools/generic/generic.interfaces";

export const APIEstabelecimento = "estabelecimento";

export interface IEstabelecimento extends IModelo {
  nome: string;
  tipo: string;
  nota: number;
  imagemFundo: string;
  imagemLogo: string;
  tempoMin: number;
  tempoMax: number;
  desconto: number;
};