import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginParametros } from 'src/app/interfaces/login.interfaces';
import { IResult } from 'src/app/interfaces/result.interfaces';
import { RequestService } from 'src/app/widgets/util/request.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl = environment.baseUrl;

  constructor(
    private requestService: RequestService
  ) { }

  v1Login(parametros: ILoginParametros): Observable<IResult> {
    const api = this.apiUrl + `user/login`;
    return this.requestService.get<IResult>(api, parametros);
  };

  v1ValidarToken(sessionToken: string): Observable<IResult> {
    const api = this.apiUrl + `user/validar`;
    return this.requestService.get<IResult>(api, { token: sessionToken });
  };

}
