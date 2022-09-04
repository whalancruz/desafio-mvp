import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { eHeaderMenuType } from 'src/app/enums/header-menu-type.enums';
import { eInSessaoStorage } from 'src/app/enums/storage.enums';
import { IEstabelecimento } from 'src/app/interfaces/estabelecimento.interfaces';
import { EstabelecimentoService } from 'src/app/services/estabelecimento/estabelecimento.service';
import { IHeaderMenu } from 'src/app/widgets/header-menu/header-menu.interfaces';
import { HeaderMenuService } from 'src/app/widgets/header-menu/header-menu.service';
import { PagesService } from 'src/app/widgets/util/pages.service';

@Component({
  selector: 'app-estabelecimento-buscar',
  templateUrl: './estabelecimento-buscar.component.html',
  styleUrls: ['./estabelecimento-buscar.component.scss']
})
export class EstabelecimentoBuscarComponent implements OnInit {

  headerMenu: IHeaderMenu;
  controlEstabelecimentoBuscar: FormControl = new FormControl(null);
  estabelecimentos: IEstabelecimento[];

  constructor(
    private pagesService: PagesService,
    private headerMenuService: HeaderMenuService,
    private estabelecimentoService: EstabelecimentoService
  ) { }

  ngOnInit(): void {
    this.headerMenu = this.headerMenuService.inicialize(<IHeaderMenu>{ widgetID: 'estabelecimento-buscar', type: eHeaderMenuType.Bars });

    this.headerMenu.response = ($event) => {
      this.buscarEstabelecimento($event);
    };
  };

  public responseEvent($event) {
    this.buscarEstabelecimento($event);
  };

  public async buscarEstabelecimento(filtro: string) {
    if(!filtro) return this.estabelecimentos = [];

    await firstValueFrom(this.estabelecimentoService.v1BuscarEstabelecimentosFiltro(filtro)).then(result => {
      if (result && result.success) {
        this.estabelecimentos = result.data;
      };
    });
  };

  public redirecionarDetalhes(estabelecimento: IEstabelecimento) {
    this.pagesService.hairSalonTokenService.setKey(eInSessaoStorage.Estabelecimento, JSON.stringify(estabelecimento));

    this.pagesService.routerService.navigate('detalhes');
  };

}
