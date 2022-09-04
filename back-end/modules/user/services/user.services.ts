
import { config } from "../../../tools/config/config";
import { GenericServices } from "../../../tools/generic/generic.services";
import { IAuthToken } from "../../authToken/models/authToken.models";
import { AuthTokenServices } from "../../authToken/services/authToken.services";
import { APIUser, IUser, IUserLogin } from "../models/user.models";

let CryptoJS = require("crypto-js");

export class UserServices extends GenericServices {

    public api: string = APIUser;
    authTokenServices: AuthTokenServices;

    constructor() {
        super();
        super.api = this.api;

        this.authTokenServices = new AuthTokenServices();
    };

    public login(parametros: IUserLogin) {
        return new Promise(async (resolve) => {
            if (!parametros.email || !parametros.password) return resolve(this.InvalidResult('Aconteceu algo inesperado'));

            let responseMongo = await this.searchFirst({ email: parametros.email, password: parametros.password });

            if (responseMongo.success) {
                let usuario = responseMongo.data as IUser;

                let dataToken = <IUser>{
                    email: usuario.email,
                    endereco: usuario.endereco,
                    nome: usuario.nome
                };

                let encrypto = CryptoJS.AES.encrypt(JSON.stringify(dataToken), config.secretKey).toString();

                await this.desativarTokensAtivos(usuario);
                await this.inserirAuthToken(usuario, encrypto);

                return resolve(this.OkResult(encrypto));
            };

            resolve(this.InvalidResult('Email e senha está inválido'))
        });
    };

    private async desativarTokensAtivos(usuario: IUser) {
        let response = await this.authTokenServices.searchAll({ userID: usuario._id, valido: true });
        if (response.success) {
            let authTokens = response.data as IAuthToken[];

            for (let index = 0; index < authTokens.length; index++) {
                const element = authTokens[index];

                element.valido = false;

                await this.authTokenServices.edit(element);
            };
        };
    };

    private async inserirAuthToken(usuario: IUser, encrypto: string) {

        let token = <IAuthToken>{
            userID: usuario._id,
            token: encrypto,
            valido: true
        };

        await this.authTokenServices.InsertIfNotExist(token, { token: token.token, userID: token.userID })
    };

    public validar(sessionToken: string) {
        return new Promise(async (resolve) => {
            if (!sessionToken) return resolve(this.InvalidResult('Aconteceu algo inesperado'));

            let byte = CryptoJS.AES.decrypt(sessionToken, config.secretKey);
            let originalResult = byte.toString(CryptoJS.enc.Utf8);

            if (originalResult) {
                originalResult = JSON.parse(originalResult) as IUser;

                let responseMongo = await this.searchFirst({ email: originalResult.email });

                if (responseMongo.success) {
                    let usuario = responseMongo.data as IUser;

                    let responseMongoToken = await this.authTokenServices.searchFirst({ userID: usuario._id, token: sessionToken, valido: true });

                    if (responseMongoToken.success) return resolve(this.OkResult(true));
                };
            };

            resolve(this.InvalidResult('Token informado é inválido.'))
        });
    };

}