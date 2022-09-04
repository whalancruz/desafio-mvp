export interface IEstabelecimento {
  desconto: number; // 4.99
  nome: string; // "Kibon Sorveteria"
  imagemFundo: string; // 'https://static-images.ifood.com.br/image/upload//capa/13b1381e-b9fd-4941-b906-5ed31dd7113d/202208221205_0aRm_i@2x.jpg',
  imagemLogo: string; // 'https://static-images.ifood.com.br/image/upload/t_thumbnail/logosgde/13b1381e-b9fd-4941-b906-5ed31dd7113d/202203221840_Jjxl_i.jpg',
  nota: number; // 4.5
  tempoMax: number; // 60
  tempoMin: number; // 30
  tipo: string; // "Sorvetes"
  _id: string; // "63141d8dfe91ed1c5030a92c"
}

export interface IEstabelecimentoProdutosLista {
  categoria: string;
  produtos: IEstabelecimentoProdutos[];
};

export interface IEstabelecimentoProdutos {
  estabelecimentoCategoriaID: string;
  imagemFundo: string;
  nome: string;
  descricao: string;
  price: number;
};
