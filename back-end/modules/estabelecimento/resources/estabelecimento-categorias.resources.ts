import { GenericServices } from "../../../tools/generic/generic.services";
import { APIEstabelecimentoCategorias, IEstabelecimentoCategorias } from "../models/estabelecimento-categorias.models";
import { IEstabelecimento } from "../models/estabelecimento.models";
import { EstabelecimentoServices } from "../services/estabelecimento.services";


export class EstabelecimentoCategoriasResources extends GenericServices {

  api: string = APIEstabelecimentoCategorias;

  estabelecimentoServices: EstabelecimentoServices

  constructor() {
    super();
    super.api = this.api;

    this.estabelecimentoServices = new EstabelecimentoServices();
  };

  public async register() {
    var listInsert: IEstabelecimentoCategorias[] = [];

    let estabelecimentosMongo = await this.estabelecimentoServices.searchAll({});

    if (estabelecimentosMongo.success) {
      let estabelecimentos = estabelecimentosMongo.data as IEstabelecimento[];

      for (let index = 0; index < estabelecimentos.length; index++) {
        const element = estabelecimentos[index];

        if (element.nome === 'Kibon Sorveteria') {
          listInsert.push(<IEstabelecimentoCategorias>{
            estabelecimentoID: element._id,
            categoria: `Sorvetes`
          });
          listInsert.push(<IEstabelecimentoCategorias>{
            estabelecimentoID: element._id,
            categoria: `Potes famosos`
          });
        };

        if (element.nome === 'Burger King') {
          listInsert.push(<IEstabelecimentoCategorias>{
            estabelecimentoID: element._id,
            categoria: `Almoço no precinho`
          });
          listInsert.push(<IEstabelecimentoCategorias>{
            estabelecimentoID: element._id,
            categoria: `Deixa baixo, preço baixo`
          });
        };

      };
    };

    for (let index = 0; index < listInsert.length; index++) {
      const element = listInsert[index];
      await this.InsertIfNotExist(element, { estabelecimentoID: element.estabelecimentoID, categoria: element.categoria })
    };
  };

}

export const estabelecimentoCategoriasResources = new EstabelecimentoCategoriasResources();