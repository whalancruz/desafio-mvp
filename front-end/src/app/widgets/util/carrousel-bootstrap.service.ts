import { Injectable } from '@angular/core';
import { ICarrouselBootstrap } from 'src/app/interfaces/carrousel-bootstrap.interfaces';

declare const $: any;

@Injectable({
  providedIn: 'root'
})
export class CarrouselBootstrapService {

  public inicialize(widgetID: string): ICarrouselBootstrap {
    let ultimaPagina = null;

    return <ICarrouselBootstrap>{
      widgetID: widgetID,
      onNext: () => {
        ultimaPagina = $(`#${widgetID} .carousel-item.active`).index();
        $(`#${widgetID}`).carousel('next');
      },
      onPrev: () => {
        ultimaPagina = $(`#${widgetID} .carousel-item.active`).index();
        $(`#${widgetID}`).carousel('prev');
      },
      paginaAtual: () => {
        return $(`#${widgetID} .carousel-item.active`).index();
      }
    };
  };

}
