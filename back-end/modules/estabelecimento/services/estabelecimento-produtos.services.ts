
import { GenericServices } from "../../../tools/generic/generic.services";
import { APIEstabelecimentoProdutos, IEstabelecimentoProdutos, IEstabelecimentoProdutosLista } from "../models/estabelecimento-produtos.models";
import { ObjectId } from 'mongodb';
import { EstabelecimentoCategoriasServices } from "./estabelecimento-categorias.services";
import { IEstabelecimentoCategorias } from "../models/estabelecimento-categorias.models";

export class EstabelecimentoProdutosServices extends GenericServices {

    public api: string = APIEstabelecimentoProdutos;

    estabelecimentoCategoriasServices: EstabelecimentoCategoriasServices;

    constructor() {
        super();
        super.api = this.api;

        this.estabelecimentoCategoriasServices = new EstabelecimentoCategoriasServices();
    };

    public buscar(estabelecimentoID: string) {
        return new Promise(async (resolve) => {
            let listaProdutos: IEstabelecimentoProdutosLista[] = []

            let object = new ObjectId(estabelecimentoID);

            let categoriasMongo = await this.estabelecimentoCategoriasServices.searchAll({ estabelecimentoID: object });

            if (categoriasMongo.success) {
                let categorias = categoriasMongo.data as IEstabelecimentoCategorias[];

                for (let index = 0; index < categorias.length; index++) {
                    const categoria = categorias[index];

                    let produtosMongo = await this.searchAll({ estabelecimentoCategoriaID: categoria._id });

                    if (produtosMongo.success) {
                        let produtos = produtosMongo.data as IEstabelecimentoProdutos[];

                        if (produtos?.length > 0) {
                            listaProdutos.push(<IEstabelecimentoProdutosLista>{
                                categoria: categoria.categoria,
                                produtos: produtos
                            });
                        }
                    };

                };
            };

            resolve(this.OkResult(listaProdutos));
        });
    };

}