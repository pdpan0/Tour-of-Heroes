/*
  Arquivo responsável pelos módulos do app.
*/

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Habilita [(ngModel)] para formulários.
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';

@NgModule({
  // Todos componentes devem ser declarados.
  declarations: [
    AppComponent,
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
