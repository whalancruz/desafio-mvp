import { eHeaderMenuType } from "src/app/enums/header-menu-type.enums";

export interface IHeaderMenu {
  widgetID: string;
  type: eHeaderMenuType;
  response(element: string): void;
};
