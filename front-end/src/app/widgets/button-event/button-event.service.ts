import { Injectable } from '@angular/core';
import { IButtonEvent } from './button-event.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ButtonEventService {

  public inicialize(options: IButtonEvent): IButtonEvent {
    return <IButtonEvent> {
      widgetID: options.widgetID,
      text: (options.text) ? options.text : 'Não Informado',
      response: (click: boolean) => { return null; },
      inicializeLoading: () => { },
      closeLoading: () => { }
    };
  };

};
