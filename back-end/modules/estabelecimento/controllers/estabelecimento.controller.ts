
import Router from "koa-router";

import { GenericController } from "../../../tools/generic/generic.controller";
import { APIEstabelecimento, IEstabelecimento } from "../models/estabelecimento.models";
import { EstabelecimentoServices } from "../services/estabelecimento.services";

export class EstabelecimentoController extends GenericController<IEstabelecimento> {
     public api: string = APIEstabelecimento;

     service: EstabelecimentoServices;

     constructor() {
          super();
          this.service = new EstabelecimentoServices();
     };

     public applyRoutes(koaRouter: Router) {

          koaRouter.get(`/${this.api}/lista-estabelecimentos`, async (ctx: any) => {
               ctx.body = await this.service.buscar();
          });

          koaRouter.get(`/${this.api}/filtro`, async (ctx: any) => {
               let body = ctx.request.query;

               ctx.body = await this.service.filtro(body.filtro);
          });

          super.applyRoutes(koaRouter);
     };

};

export const estabelecimentoController = new EstabelecimentoController();

