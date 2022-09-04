import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResult } from 'src/app/interfaces/result.interfaces';
import { RequestService } from 'src/app/widgets/util/request.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstabelecimentoService {

  apiUrl = environment.baseUrl;

  constructor(
    private requestService: RequestService
  ) { }

  v1BuscarEstabelecimentos(): Observable<IResult> {
    const api = this.apiUrl + `estabelecimento/lista-estabelecimentos`;
    return this.requestService.get<IResult>(api);
  };

  v1BuscarEstabelecimentosProdutos(estabelecimentoID: string): Observable<IResult> {
    const api = this.apiUrl + `estabelecimento-produtos/lista-produtos`;
    return this.requestService.get<IResult>(api, { estabelecimentoID: estabelecimentoID });
  };

  v1BuscarEstabelecimentosFiltro(filtro: string): Observable<IResult> {
    const api = this.apiUrl + `estabelecimento/filtro`;
    return this.requestService.get<IResult>(api, { filtro: filtro });
  };

}
