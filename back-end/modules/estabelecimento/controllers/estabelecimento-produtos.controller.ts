
import Router from "koa-router";

import { GenericController } from "../../../tools/generic/generic.controller";
import { APIEstabelecimentoProdutos, IEstabelecimentoProdutos } from "../models/estabelecimento-produtos.models";
import { EstabelecimentoProdutosServices } from "../services/estabelecimento-produtos.services";

export class EstabelecimentoProdutosController extends GenericController<IEstabelecimentoProdutos> {
     public api: string = APIEstabelecimentoProdutos;

     service: EstabelecimentoProdutosServices;

     constructor() {
          super();
          this.service = new EstabelecimentoProdutosServices();
     };

     public applyRoutes(koaRouter: Router) {

          koaRouter.get(`/${this.api}/lista-produtos`, async (ctx: any) => {
               let body = ctx.request.query;

               ctx.body = await this.service.buscar(body.estabelecimentoID);
          });

          super.applyRoutes(koaRouter);
     };

};

export const estabelecimentoProdutosController = new EstabelecimentoProdutosController();

