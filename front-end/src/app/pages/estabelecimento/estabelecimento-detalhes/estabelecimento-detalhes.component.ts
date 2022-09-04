import { Component, OnInit, ViewChild } from '@angular/core';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { firstValueFrom } from 'rxjs';
import { eHeaderMenuType } from 'src/app/enums/header-menu-type.enums';
import { eInSessaoStorage } from 'src/app/enums/storage.enums';
import { IEstabelecimento, IEstabelecimentoProdutosLista } from 'src/app/interfaces/estabelecimento.interfaces';
import { EstabelecimentoService } from 'src/app/services/estabelecimento/estabelecimento.service';
import { IHeaderMenu } from 'src/app/widgets/header-menu/header-menu.interfaces';
import { HeaderMenuService } from 'src/app/widgets/header-menu/header-menu.service';
import { PagesService } from 'src/app/widgets/util/pages.service';

@Component({
  selector: 'app-estabelecimento-detalhes',
  templateUrl: './estabelecimento-detalhes.component.html',
  styleUrls: ['./estabelecimento-detalhes.component.scss']
})
export class EstabelecimentoDetalhesComponent implements OnInit {

  estabelecimento: IEstabelecimento;
  categorias: IEstabelecimentoProdutosLista[];
  headerMenu: IHeaderMenu;
  leftNavDisabled = true;
  rightNavDisabled = true;

  @ViewChild('nav', { read: DragScrollComponent }) ds: DragScrollComponent;

  constructor(
    private pagesService: PagesService,
    private headerMenuService: HeaderMenuService,
    private estabelecimentoService: EstabelecimentoService
  ) { }

  ngOnInit(): void {
    this.estabelecimento = JSON.parse(this.pagesService.hairSalonTokenService.getKey(eInSessaoStorage.Estabelecimento));
    this.headerMenu = this.headerMenuService.inicialize(<IHeaderMenu>{ widgetID: 'estabelecimento-detalhes', type: eHeaderMenuType.Arrow });

    if (!this.estabelecimento) return this.pagesService.routerService.navigate('home');

    this.inicializar();
  };

  public async inicializar() {
    await firstValueFrom(this.estabelecimentoService.v1BuscarEstabelecimentosProdutos(this.estabelecimento._id)).then(result => {
      if (result && result.success) {
        this.categorias = result.data;
      };
    });
  };

  moveLeft() {
    this.ds.moveLeft();
  };

  moveRight() {
    this.ds.moveRight();
  };

  moveTo(idx: number) {
    this.ds.moveTo(idx);
  };

  leftBoundStat(reachesLeftBound: boolean) {
    this.leftNavDisabled = reachesLeftBound;
  };

  rightBoundStat(reachesRightBound: boolean) {
    this.rightNavDisabled = reachesRightBound;
  };

};
