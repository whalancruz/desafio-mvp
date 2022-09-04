import { GenericServices } from "../../../tools/generic/generic.services";
import { APIEstabelecimento, IEstabelecimento } from "../models/estabelecimento.models";


export class EstabelecimentoResources extends GenericServices {

    api: string = APIEstabelecimento;

    constructor() {
        super();
        super.api = this.api;
    };

    public async register() {
        var listInsert: IEstabelecimento[] = [];

        listInsert.push(<IEstabelecimento>{
            nome: 'Kibon Sorveteria',
            tipo: 'Sorvetes',
            imagemFundo: 'https://static-images.ifood.com.br/image/upload//capa/13b1381e-b9fd-4941-b906-5ed31dd7113d/202208221205_0aRm_i@2x.jpg',
            imagemLogo: 'https://static-images.ifood.com.br/image/upload/t_thumbnail/logosgde/13b1381e-b9fd-4941-b906-5ed31dd7113d/202203221840_Jjxl_i.jpg',
            nota: 4.5,
            tempoMin: 20,
            tempoMax: 30,
            desconto: 4.99
        });

        listInsert.push(<IEstabelecimento>{
            nome: 'Burger King',
            tipo: 'Lanche',
            imagemFundo: 'https://static-images.ifood.com.br/image/upload//capa/e937c9a8-9135-4259-8be6-f5f6544bd643/202111271136_KWO6_b@2x.png',
            imagemLogo: 'https://static-images.ifood.com.br/image/upload/t_thumbnail/logosgde/e937c9a8-9135-4259-8be6-f5f6544bd643/202111271037_aDdx_i.png',
            nota: 4.7,
            tempoMin: 40,
            tempoMax: 50,
            desconto: 10.99
        });


        for (let index = 0; index < listInsert.length; index++) {
            const element = listInsert[index];
            await this.InsertIfNotExist(element, { nome: element.nome })
        };
    };

}

export const estabelecimentoResources = new EstabelecimentoResources();