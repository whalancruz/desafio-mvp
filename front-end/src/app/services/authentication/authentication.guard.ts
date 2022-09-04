import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { eInSessaoStorage } from 'src/app/enums/storage.enums';
import { PagesService } from 'src/app/widgets/util/pages.service';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private pagesService: PagesService,
    private loginService: LoginService
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise(async (resolve) => {
      let sessionToken = this.pagesService.hairSalonTokenService.getKey(eInSessaoStorage.Session);

      if (sessionToken) return resolve(await this.validarToken(sessionToken))
      else this.pagesService.routerService.navigate('login');

    });
  };

  public validarToken(sessionToken: string): Promise<boolean> {
    return new Promise(async (resolve) => {

      await firstValueFrom(this.loginService.v1ValidarToken(sessionToken)).then(result => {
        if (!result.success) return this.pagesService.routerService.navigate('login');
      });

      resolve(true);
    });
  };

};
