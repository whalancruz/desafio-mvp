import { Injectable } from '@angular/core';
import { IHeaderMenu } from './header-menu.interfaces';

@Injectable({
  providedIn: 'root'
})
export class HeaderMenuService {

  public inicialize(options: IHeaderMenu): IHeaderMenu {
    return <IHeaderMenu> {
      widgetID: options.widgetID,
      type: options.type,
      response: (element: string) => { return null; },
    };
  };

};
