export interface IButtonEvent {
  widgetID: string;
  text: string;
  response(click: boolean): void;
  inicializeLoading(): void;
  closeLoading(): void;
}
