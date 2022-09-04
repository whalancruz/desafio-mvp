
import Router from "koa-router";

import { GenericController } from "../../../tools/generic/generic.controller";
import { APIAuthToken, IAuthToken } from "../models/authToken.models";
import { AuthTokenServices } from "../services/authToken.services";

export class AuthTokenController extends GenericController<IAuthToken> {
     public api: string = APIAuthToken;

     service: AuthTokenServices;

     constructor() {
          super();
          this.service = new AuthTokenServices();
     };

     public applyRoutes(koaRouter: Router) {

     };

};

export const authTokenController = new AuthTokenController();

