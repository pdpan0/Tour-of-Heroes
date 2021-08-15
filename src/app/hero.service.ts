import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { HEROES } from './heroes-mock';

// Injectable é responsável pela injeção de dependências.
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor() { }

  getHeroes(): Observable<Hero[]> {
    // of(HEROES) retorna um Observable<Hero[]>
    // Observable são coleções de multiplos valores que apenas são carregadas sob demanda.
    const heroes = of(HEROES)
    return heroes;
  }
}
