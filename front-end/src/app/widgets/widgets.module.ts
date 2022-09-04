import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonEventComponent } from './button-event/button-event.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { InputSearchComponent } from './input-search/input-search.component';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ButtonEventComponent,
    HeaderMenuComponent,
    InputSearchComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  exports: [
    ButtonEventComponent,
    HeaderMenuComponent,
    InputSearchComponent
  ]
})
export class WidgetsModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, fab, far);
  }
}
