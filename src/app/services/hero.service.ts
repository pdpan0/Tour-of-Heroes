import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { Hero } from '../hero';
import { HEROES } from '../heroes-mock';

// Injectable é responsável pela injeção de dependências.
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    // Injetando um serviço dentro de um serviço (service-in-service).
    private messageService: MessageService) {

  }

  getHeroes(): Observable<Hero[]> {
    // of(HEROES) retorna um Observable<Hero[]>
    // Observable são coleções de multiplos valores que apenas são carregadas sob demanda.
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }
}
