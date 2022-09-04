import * as Router from "koa-router";

import { ObjectId } from 'mongodb';
import { GenericServices } from "./generic.services";

export class GenericController<TModelo> {
    public api: string = "";

    service: GenericServices;

    constructor() {
        this.service = new GenericServices()
    };

    public applyRoutes(koaRouter: Router) {

        koaRouter.post(`/${this.api}/salvar`, async (ctx: any) => {
            let body = ctx.request.query;

            if (body._id) body._id = new ObjectId(body._id);

            ctx.body = await this.service.onSalvar(body, { _id: body._id });
        });

        // koaRouter.get(`/${this.api}/delete/:id`, async (ctx: any) => {
        //     var id = ctx.params.id;

        //     if (isNullOrUndefined(id)) return ctx.body = "Nenhum parâmetro informado!";

        //     ctx.body = await this.service.delete(new ObjectId(id));
        // });

    };

};

export const genericController = new GenericController();