import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstabelecimentoDetalhesComponent } from './estabelecimento-detalhes/estabelecimento-detalhes.component';
import { WidgetsModule } from 'src/app/widgets/widgets.module';
import { DragScrollModule } from 'ngx-drag-scroll';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { EstabelecimentoBuscarComponent } from './estabelecimento-buscar/estabelecimento-buscar.component';


@NgModule({
  declarations: [
    EstabelecimentoDetalhesComponent,
    EstabelecimentoBuscarComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    WidgetsModule,
    DragScrollModule
  ],
  exports: [
    EstabelecimentoDetalhesComponent,
    EstabelecimentoBuscarComponent
  ]
})
export class EstabelecimentoModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, fab, far);
  }
}
