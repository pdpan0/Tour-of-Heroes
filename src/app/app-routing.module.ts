import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Configura as rotas.
const routes: Routes = [
  // url default
  {path: '', redirectTo:'/dashboard', pathMatch: 'full'},
  {path: 'heroes', component: HeroesComponent},
  {path: 'dashboard', component: DashboardComponent}
]

@NgModule({
  imports: [
    // forRoot() configura o escopo da rota a partir da raiz.
    // fornecendo metódos e diretivas  que são necessários para as rotas
    // performando a navegação baseada na url atual.
    RouterModule.forRoot(routes)
  ],
  exports: [
    // permite que o módulo esteja disponível por toda aplicação.
    RouterModule
  ]
})

export class AppRoutingModule { }
