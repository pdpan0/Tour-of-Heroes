import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

// Configura as rotas.
const routes: Routes = [
  // url default
  {path: '', redirectTo:'/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'heroes', component: HeroesComponent},
  {path: 'detail/:id', component: HeroDetailComponent}
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
