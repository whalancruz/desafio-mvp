import { GenericServices } from "../../../tools/generic/generic.services";
import { IEstabelecimentoCategorias } from "../models/estabelecimento-categorias.models";
import { APIEstabelecimentoProdutos, IEstabelecimentoProdutos } from "../models/estabelecimento-produtos.models";
import { IEstabelecimento } from "../models/estabelecimento.models";
import { EstabelecimentoCategoriasServices } from "../services/estabelecimento-categorias.services";
import { EstabelecimentoServices } from "../services/estabelecimento.services";


export class EstabelecimentoProdutosResources extends GenericServices {

  api: string = APIEstabelecimentoProdutos;

  estabelecimentoServices: EstabelecimentoServices;
  estabelecimentoCategoriasServices: EstabelecimentoCategoriasServices;

  constructor() {
    super();
    super.api = this.api;

    this.estabelecimentoServices = new EstabelecimentoServices();
    this.estabelecimentoCategoriasServices = new EstabelecimentoCategoriasServices();
  };

  public async register() {
    var listInsert: IEstabelecimentoProdutos[] = [];

    let estabelecimentosMongo = await this.estabelecimentoServices.searchAll({});

    if (estabelecimentosMongo.success) {
      let estabelecimentos = estabelecimentosMongo.data as IEstabelecimento[];

      for (let index = 0; index < estabelecimentos.length; index++) {
        const element = estabelecimentos[index];

        let categoriasMongo = await this.estabelecimentoCategoriasServices.searchAll({});

        if (element.nome === 'Kibon Sorveteria') {
          await this.cargaProdutosKibon(categoriasMongo.data, listInsert);
        };

        if (element.nome === 'Burger King') {
          await this.cargaProdutosBurguerKing(categoriasMongo.data, listInsert);
        };
        
      };
    };

    for (let index = 0; index < listInsert.length; index++) {
      const element = listInsert[index];
      await this.InsertIfNotExist(element, { estabelecimentoCategoriaID: element.estabelecimentoCategoriaID, descricao: element.descricao })
    };
  };


  public cargaProdutosKibon(categorias: IEstabelecimentoCategorias[], listInsert: IEstabelecimentoProdutos[]) {
    for (let index = 0; index < categorias.length; index++) {
      const element = categorias[index];

      if (element.categoria === 'Sorvetes') {
        listInsert.push(<IEstabelecimentoProdutos>{
          estabelecimentoCategoriaID: element._id,
          nome: 'Magnum Zero % A????car',
          price: 18.20,
          descricao: '100% Prazer: sorvete cremoso sabor chocolate e deliciosa cobertura de chocolate Magnum. Surpreenda-se!',
          imagemFundo: 'https://static-images.ifood.com.br/image/upload/t_low/pratos/55bd23ed-5240-4a58-8db0-cc3e293c7134/202108311520_0375_f.png'
        });
        listInsert.push(<IEstabelecimentoProdutos>{
          estabelecimentoCategoriaID: element._id,
          nome: 'Picol?? Kibon Muita Fruta Manga 77g',
          price: 9,
          descricao: 'Fruttare Muita Fruta Manga ?? um refrescante picol?? de Manga delicioso desde a primeira mordida. Feito com mangas de origem sustent??vel colhidas no Sudeste do Brasil, traz o sabor real da fruta. Sua f??rmula cont??m apenas ?? manga, ??gua, a????car e pectina, que ?? extra??da da casca de frutas c??tricas e deixa o picol?? com uma textura ainda mais macia!',
          imagemFundo: 'https://static-images.ifood.com.br/image/upload/t_low/pratos/55bd23ed-5240-4a58-8db0-cc3e293c7134/202102121710_3N4c_f.png'
        });
        listInsert.push(<IEstabelecimentoProdutos>{
          estabelecimentoCategoriaID: element._id,
          nome: 'Picol?? Kibon Twister 60g',
          price: 8.45,
          descricao: 'Sorvete de abacaxi com espiral de lim??o e recheio de morango. Sem lactose, sem corantes e sem aromas artificiais. Delicioso e divertido!',
          imagemFundo: 'https://static-images.ifood.com.br/image/upload/t_low/pratos/55bd23ed-5240-4a58-8db0-cc3e293c7134/202111161548_C31Q_i.jpg'
        });
      };

      if (element.categoria === 'Potes famosos') {
        listInsert.push(<IEstabelecimentoProdutos>{
          estabelecimentoCategoriaID: element._id,
          nome: 'Pote Kibon Sundae Leitinho Trufado 1,4l',
          price: 44,
          descricao: 'Combina????o perfeita de sorvete com muita calda. Sorvete sabor leite com calda de chocolate trufado. ?? tanta calda que d?? pra ver pelo pote! Kibon Sundae ?? uma ??tima op????o para compartilhar em momentos especiais.!',
          imagemFundo: 'https://static-images.ifood.com.br/image/upload/t_low/pratos/55bd23ed-5240-4a58-8db0-cc3e293c7134/202010290012_47fx_f.png'
        });
        listInsert.push(<IEstabelecimentoProdutos>{
          estabelecimentoCategoriaID: element._id,
          nome: 'Pote Kibon Sundae Chocolate 1,4l',
          price: 44,
          descricao: 'Combina????o perfeita de sorvete com muita calda. Sorvete sabor leite com calda de chocolate trufado. ?? tanta calda que d?? pra ver pelo pote! Kibon Sundae ?? uma ??tima op????o para compartilhar em momentos especiais.!',
          imagemFundo: 'https://static-images.ifood.com.br/image/upload/t_low/pratos/55bd23ed-5240-4a58-8db0-cc3e293c7134/202010290013_DYgO_f.png'
        });
        listInsert.push(<IEstabelecimentoProdutos>{
          estabelecimentoCategoriaID: element._id,
          nome: 'Pote Kibon Unic??rnio 800ml',
          price: 36.60,
          descricao: 'Kibon Unic??rnio combina de forma m??gica o sorvete sabor morango com o sorvete sabor chantilly e confeitos coloridos sabor chocolate branco. Imposs??vel n??o se encantar com essa magia, Kibon Unic??rnio ?? recheado de divers??o para compartilhar com toda a fam??lia.',
          imagemFundo: 'https://static-images.ifood.com.br/image/upload/t_low/pratos/55bd23ed-5240-4a58-8db0-cc3e293c7134/202203231757_4VP1_i.jpg'
        });
      };

    };
  };

  public cargaProdutosBurguerKing(categorias: IEstabelecimentoCategorias[], listInsert: IEstabelecimentoProdutos[]) {
    for (let index = 0; index < categorias.length; index++) {
      const element = categorias[index];

      if (element.categoria === 'Almo??o no precinho') {
        listInsert.push(<IEstabelecimentoProdutos>{
          estabelecimentoCategoriaID: element._id,
          nome: 'Combo Whopper de Plantas + Bk Mix',
          price: 29.90,
          descricao: 'Procurando um almo??o no precinho?! Nosso combo 2 sandubinhas foi pensado pra voc??! Escolha 2 sandu??ches entre: Cheeseburger e Chicken Junior.',
          imagemFundo: 'https://static-images.ifood.com.br/image/upload/t_low/pratos/6e73dce2-a17f-4aef-9035-1409cea198fe/202204131546_W4K0_i.jpg'
        });
        listInsert.push(<IEstabelecimentoProdutos>{
          estabelecimentoCategoriaID: element._id,
          nome: '2 Sandubinha + Batata + Bebida',
          price: 29.90,
          descricao: 'Procurando um almo??o no precinho?! Nosso combo 2 sandubinhas foi pensado pra voc??! Escolha 2 sandu??ches entre: Cheeseburger e Chicken Junior.',
          imagemFundo: 'https://static-images.ifood.com.br/image/upload/t_low/pratos/6e73dce2-a17f-4aef-9035-1409cea198fe/202203311431_NB00_i.jpg'
        });
      };

      if (element.categoria === 'Deixa baixo, pre??o baixo') {
        listInsert.push(<IEstabelecimentoProdutos>{
          estabelecimentoCategoriaID: element._id,
          nome: 'Combo Whopper Furioso',
          price: 35.90,
          descricao: 'Escolha seu sandu??che entre: Chicken junior, cheeseburger, Bk cheddar e rodeio. Acompanha Bk brownie, sach?? de maionese, batata e bebida.',
          imagemFundo: 'https://static-images.ifood.com.br/image/upload/t_low/pratos/6e73dce2-a17f-4aef-9035-1409cea198fe/202208311551_ES73_i.jpg'
        });
        listInsert.push(<IEstabelecimentoProdutos>{
          estabelecimentoCategoriaID: element._id,
          nome: 'Combo Milanesa 1.0',
          price: 28.90,
          descricao: 'Milanese-se! Se liga que essa deliciosa novidade vem pra saciar a sua fome. Vem comigo de p??o de brioche, alface, tomate, molho barbecue, queijo cheddar e aquela carne milanesa especial do Bk. Acompanha batata e bebida.',
          imagemFundo: 'https://static-images.ifood.com.br/image/upload/t_low/pratos/6e73dce2-a17f-4aef-9035-1409cea198fe/202208311552_5HTB_i.jpg'
        });
      };

    }
  }

}

export const estabelecimentoProdutosResources = new EstabelecimentoProdutosResources();