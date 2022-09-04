import { Injectable } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  private _previousUrl: string;
  private _currentUrl: string;

  constructor(private _router: Router) {
    this._currentUrl = this._router.url;
    _router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this._previousUrl = this._currentUrl;
        this._currentUrl = event.url;
      };
    });
  };

  public get previousUrl() {
    return this._previousUrl;
  }

  public get currentUrl() {
    return this._currentUrl;
  }

  navigate(url: string) {
    this._router.navigate([url]);
  };

};
