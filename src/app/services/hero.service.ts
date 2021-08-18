import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from '../interfaces/hero';
import { HEROES } from '../heroes-mock';

// Injectable é responsável pela injeção de dependências.
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  // URL da api.
  private heroesUrl = 'api/heroes';
  
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

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
        // tap() é um operador que observa os valores Observable e realiza alguma operação, neste caso apenas loga.
        tap(_ => this.log('fetched heroes')),
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
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  searchHero(term: string): Observable<Hero[]> {
    if(!term.trim()) {
      return of([])
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(x => x.length ? 
          this.log(`found heroes matching "${term}"`) : 
          this.log(`no heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHero', []))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      )
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions)
      .pipe(
        tap((newHero: Hero) => this.log(`Added hero w/ id ${newHero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      )
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
