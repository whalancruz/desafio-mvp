
import Router from "koa-router";

import { GenericController } from "../../../tools/generic/generic.controller";
import { APIUser, IUser } from "../models/user.models";
import { UserServices } from "../services/user.services";
import { ObjectId } from 'mongodb';

export class UserController extends GenericController<IUser> {
     public api: string = APIUser;

     service: UserServices;

     constructor() {
          super();
          this.service = new UserServices();
     };

     public applyRoutes(koaRouter: Router) {

          koaRouter.get(`/${this.api}/login`, async (ctx: any) => {
               let body = ctx.request.query;

               ctx.body = await this.service.login(body);
          });

          koaRouter.get(`/${this.api}/validar`, async (ctx: any) => {
               let body = ctx.request.query;

               ctx.body = await this.service.validar(body?.token);
          });

          super.applyRoutes(koaRouter);
     };

};

export const userController = new UserController();

