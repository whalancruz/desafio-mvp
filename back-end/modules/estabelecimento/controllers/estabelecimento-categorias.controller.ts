
import Router from "koa-router";

import { GenericController } from "../../../tools/generic/generic.controller";
import { APIEstabelecimentoCategorias, IEstabelecimentoCategorias } from "../models/estabelecimento-categorias.models";
import { EstabelecimentoCategoriasServices } from "../services/estabelecimento-categorias.services";

export class EstabelecimentoCategoriasController extends GenericController<IEstabelecimentoCategorias> {
     public api: string = APIEstabelecimentoCategorias;

     service: EstabelecimentoCategoriasServices;

     constructor() {
          super();
          this.service = new EstabelecimentoCategoriasServices();
     };

     public applyRoutes(koaRouter: Router) {

          super.applyRoutes(koaRouter);
     };

};

export const estabelecimentoCategoriasController = new EstabelecimentoCategoriasController();

