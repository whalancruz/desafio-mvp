import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RouterService } from './router.service';
import { HairSalonTokenService } from './sessao.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(
    public formBuilder: FormBuilder,
    public routerService: RouterService,
    public hairSalonTokenService: HairSalonTokenService,
    public location: Location
  ) { }

}
