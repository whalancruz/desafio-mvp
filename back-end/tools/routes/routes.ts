import { estabelecimentoCategoriasController } from "../../modules/estabelecimento/controllers/estabelecimento-categorias.controller";
import { estabelecimentoProdutosController } from "../../modules/estabelecimento/controllers/estabelecimento-produtos.controller";
import { estabelecimentoController } from "../../modules/estabelecimento/controllers/estabelecimento.controller";
import { estabelecimentoCategoriasResources } from "../../modules/estabelecimento/resources/estabelecimento-categorias.resources";
import { estabelecimentoProdutosResources } from "../../modules/estabelecimento/resources/estabelecimento-produtos.resources";
import { estabelecimentoResources } from "../../modules/estabelecimento/resources/estabelecimento.resources";
import { userController } from "../../modules/user/controllers/user.controller";
import { userResources } from "../../modules/user/resources/user.resources";

export const routes = [
    userController,
    estabelecimentoController,
    estabelecimentoCategoriasController,
    estabelecimentoProdutosController
];

export const resources = [
    userResources,
    estabelecimentoResources,
    estabelecimentoCategoriasResources,
    estabelecimentoProdutosResources
];