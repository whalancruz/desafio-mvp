
import { GenericServices } from "../../../tools/generic/generic.services";
import { APIEstabelecimentoCategorias } from "../models/estabelecimento-categorias.models";
import { ObjectId } from 'mongodb';

export class EstabelecimentoCategoriasServices extends GenericServices {

    public api: string = APIEstabelecimentoCategorias;

    constructor() {
        super();
        super.api = this.api;
    };

}