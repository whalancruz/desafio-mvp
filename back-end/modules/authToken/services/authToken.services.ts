
import { GenericServices } from "../../../tools/generic/generic.services";
import { APIAuthToken } from "../models/authToken.models";

export class AuthTokenServices extends GenericServices {

    public api: string = APIAuthToken;

    constructor() {
        super();
        super.api = this.api;
    };

}