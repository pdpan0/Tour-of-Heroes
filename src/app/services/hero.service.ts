import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from '../hero';
import { HEROES } from '../heroes-mock';

// Injectable é responsável pela injeção de dependências.
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  // URL da api.
  private heroesUrl = 'api/heroes';

  constructor(
    private http: HttpClient,
    // Injetando um serviço dentro de um serviço (service-in-service).
    private messageService: MessageService
  ) {

  }

  getHeroes(): Observable<Hero[]> {
    // Consumo da api.
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        catchError(this.handleError<Hero[]>('getHeroes', []))
      )
    /*  
        of(HEROES) retorna um Observable<Hero[]>
        Observable são coleções de multiplos valores que apenas são carregadas sob demanda.
        
        const heroes = of(HEROES);
        this.messageService.add('HeroService: fetched heroes');
        return heroes;

        get() e of() ambos retornam Observable.
    */
  }

  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id = ${id}`)
    return of(hero);
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  // Lança o erro.
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: Enviar o erro para infra.
      console.log(error);

      // TODO: Melhor forma de transformar o erro para consumo do usuário.
      this.log(`${operation} failed: ${error.message}`);

      // Permite que a aplicação continue rodando por conta de um resultado vazio.
      return of(result as T);
    }
  }
}
