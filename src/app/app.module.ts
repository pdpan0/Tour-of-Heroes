/*
  Arquivo responsável pelos módulos do app.
*/

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Habilita comunicação com servers remotos via http.
import { HttpClientModule } from '@angular/common/http';

// Habilita mock para simulação de uma comunicação remota.
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

// Habilita [(ngModel)] para formulários.
import { FormsModule } from '@angular/forms';

// Componentes
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { HeroFormComponent } from './hero-form/hero-form.component';

@NgModule({
  // Todos componentes devem ser declarados.
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    HeroFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    // Inicializa o base de dados na memória.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false}
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
