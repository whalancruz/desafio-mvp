import { GenericServices } from "../../../tools/generic/generic.services";
import { APIUser, IUser } from "../models/user.models";


export class UserResources extends GenericServices {

    api: string = APIUser;

    constructor() {
        super();
        super.api = this.api;
    };

    public async register() {
        var listInsert: IUser[] = [];

        listInsert.push(<IUser>{ nome: 'Whalan', email: 'whalan.serafim@hotmail.com', endereco: 'Mariano Barboza', password: 'admin' });
        listInsert.push(<IUser>{ nome: 'Fred', email: 'fred@graodireto.com.br', endereco: 'Av Leopoldinho de Oliveira', password: '123Fred' });

        for (let index = 0; index < listInsert.length; index++) {
            const element = listInsert[index];
            await this.InsertIfNotExist(element, { email: element.email })
        };
    };

}

export const userResources = new UserResources();