import { Injectable } from '@angular/core';
import { RequestService } from 'src/app/widgets/util/request.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.baseUrl;

  constructor(
    private requestService: RequestService
  ) { }

  // v1Login(sessionToken: string): Observable<IResult> {
  //   const api = this.apiUrl + `user/login`;
  //   return this.requestService.get<IResult>(api, parametros);
  // };
}
