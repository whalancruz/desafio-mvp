
import { GenericServices } from "../../../tools/generic/generic.services";
import { APIEstabelecimento, IEstabelecimento } from "../models/estabelecimento.models";
import { ObjectId } from 'mongodb';
import { EstabelecimentoProdutosServices } from "./estabelecimento-produtos.services";
import { IEstabelecimentoProdutos } from "../models/estabelecimento-produtos.models";
import { EstabelecimentoCategoriasServices } from "./estabelecimento-categorias.services";
import { IEstabelecimentoCategorias } from "../models/estabelecimento-categorias.models";

export class EstabelecimentoServices extends GenericServices {

    public api: string = APIEstabelecimento;

    estabelecimentoProdutosServices: EstabelecimentoProdutosServices;
    estabelecimentoCategoriasServices: EstabelecimentoCategoriasServices

    constructor() {
        super();
        super.api = this.api;

        this.estabelecimentoProdutosServices = new EstabelecimentoProdutosServices();
        this.estabelecimentoCategoriasServices = new EstabelecimentoCategoriasServices();
    };

    public buscar() {
        return new Promise(async (resolve) => {
            let responseMongo = await this.searchAll({});

            resolve(this.OkResult(responseMongo?.data));
        });
    };

    public filtro(filtro: string) {
        return new Promise(async (resolve) => {
            let retorno: IEstabelecimento[] = [];

            let produtosMongoNome = await this.estabelecimentoProdutosServices.searchAll({ nome: new RegExp(filtro, 'i') });
            if (produtosMongoNome.success && produtosMongoNome?.data?.length > 0) {
                let produtos = produtosMongoNome.data as IEstabelecimentoProdutos[];

                for (let index = 0; index < produtos.length; index++) {
                    const element = produtos[index];
                    await this.buscarCategorias(element, retorno)
                };
            };

            let produtosMongoDescricao = await this.estabelecimentoProdutosServices.searchAll({ descricao: new RegExp(filtro, 'i') });
            if (produtosMongoDescricao.success && produtosMongoDescricao?.data?.length > 0) {
                let produtos = produtosMongoDescricao.data as IEstabelecimentoProdutos[];

                for (let index = 0; index < produtos.length; index++) {
                    const element = produtos[index];
                    await this.buscarCategorias(element, retorno)
                };
            };

            let estabelecimentoMongo = await this.searchAll({ nome: new RegExp(filtro, 'i') });
            if (estabelecimentoMongo.success && estabelecimentoMongo.data?.length > 0) {
                let estabelecimentos = estabelecimentoMongo.data as IEstabelecimento[];

                for (let index = 0; index < estabelecimentos.length; index++) {
                    const estabelecimentoIndex = estabelecimentos[index];


                    if (retorno.length === 0) retorno.push(estabelecimentoIndex)
                    else {
    
                        let retornoIndex = retorno.filter(x => {
                            let idPrimary = String(x._id);
                            let idSecondary= String(estabelecimentoIndex._id);
    
                            if (idPrimary != idSecondary) return x;
                        });
    
                        if(retornoIndex.length > 0) retorno.push(estabelecimentoIndex);
                    };

                };
            };

            let estabelecimentoMongoTipo = await this.searchAll({ tipo: new RegExp(filtro, 'i') });
            if (estabelecimentoMongoTipo.success && estabelecimentoMongoTipo.data?.length > 0) {
                let estabelecimentos = estabelecimentoMongoTipo.data as IEstabelecimento[];

                for (let index = 0; index < estabelecimentos.length; index++) {
                    const estabelecimentoIndex = estabelecimentos[index];

                    if (retorno.length === 0) retorno.push(estabelecimentoIndex)
                    else {
    
                        let retornoIndex = retorno.filter(x => {
                            let idPrimary = String(x._id);
                            let idSecondary= String(estabelecimentoIndex._id);
    
                            if (idPrimary != idSecondary) return x;
                        });
    
                        if(retornoIndex.length > 0) retorno.push(estabelecimentoIndex);
                    };
                };
            };

            resolve(this.OkResult(retorno));
        });
    };


    public async buscarCategorias(produto: IEstabelecimentoProdutos, retorno: IEstabelecimento[]) {
        let categoriasMongo = await this.estabelecimentoCategoriasServices.searchFirst({ _id: produto.estabelecimentoCategoriaID });

        if (categoriasMongo.success) {
            let categoria = categoriasMongo.data as IEstabelecimentoCategorias;

            let estabelecimentoMongo = await this.searchFirst({ _id: categoria.estabelecimentoID });
            if (estabelecimentoMongo.success) {
                let estabelecimento = estabelecimentoMongo.data as IEstabelecimento;

                if (retorno.length === 0) retorno.push(estabelecimento)
                else {

                    let retornoIndex = retorno.filter(x => {
                        let idPrimary = String(x._id);
                        let idSecondary= String(estabelecimento._id);

                        if (idPrimary != idSecondary) return x;
                    });

                    if(retornoIndex.length > 0) retorno.push(estabelecimento);
                };

            };
        };
    };

}