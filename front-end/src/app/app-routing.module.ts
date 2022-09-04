import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { EstabelecimentoBuscarComponent } from './pages/estabelecimento/estabelecimento-buscar/estabelecimento-buscar.component';
import { EstabelecimentoDetalhesComponent } from './pages/estabelecimento/estabelecimento-detalhes/estabelecimento-detalhes.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthenticationGuard } from './services/authentication/authentication.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'home',
    canActivate: [AuthenticationGuard],
    component: HomeComponent
  },
  {
    path: 'detalhes',
    canActivate: [AuthenticationGuard],
    component: EstabelecimentoDetalhesComponent
  },
  {
    path: 'buscar',
    canActivate: [AuthenticationGuard],
    component: EstabelecimentoBuscarComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
