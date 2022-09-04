import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { eHeaderMenuType } from 'src/app/enums/header-menu-type.enums';
import { eInSessaoStorage } from 'src/app/enums/storage.enums';
import { IUser } from 'src/app/enums/user.interfaces';
import { environment } from 'src/environments/environment';
import { PagesBase } from '../util/pages.base';
import { PagesService } from '../util/pages.service';
import { IHeaderMenu } from './header-menu.interfaces';

let CryptoJS = require("crypto-js");

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent extends PagesBase implements OnInit {

  @Input() options: IHeaderMenu;
  @Input() controlHeaderMenu: FormControl = new FormControl(null);

  user: IUser;

  constructor(
    public pagesService: PagesService
  ) {
    super(pagesService)

  };

  ngOnInit(): void {
    let session = this.pagesService.hairSalonTokenService.getKey(eInSessaoStorage.Session);

    let byte = CryptoJS.AES.decrypt(session, environment.secretKey);
    let originalResult = byte.toString(CryptoJS.enc.Utf8);

    if (originalResult) this.user = JSON.parse(originalResult);
  };

  public responseEvent($event) {
    this.options.response($event);
  };

  public get eHeaderMenuType(): typeof eHeaderMenuType {
    return eHeaderMenuType;
  };

  public redirectUrl(name: string) {
    this.pagesService.routerService.navigate(name)
  };

}
