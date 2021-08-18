import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';
import { Hero } from '../interfaces/hero';
import { HeroService } from '../services/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})

export class HeroSearchComponent implements OnInit {

  /*
    O operador de expressão !
    pode ser usado para afirmar que seu operando é nulo e undefined em contextos
    em que o verificador de tipo não consegue concluir esse fato. 
    equivalente ao :Observable<Hero[]> | undefined;
  */
  heroes$!: Observable<Hero[]>;

  /*
    Subject é um tipo especial de Observable que permite que os valores
    sejam multidirecionados para outros Observers.
    São como emitidores de eventos.
  */
  private searchTerms = new Subject<string>();

  constructor(
    private heroService: HeroService
  ) { }

  // Converte para Observable o termo de pesquisa. Em geral cria um fluxo constante de pesquisa.
  search(term: string): void {
    // next() puxa o valor da Observable.
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // Aguarda tempo para término da digitação na pesquisa.
      debounceTime(300),
      // Ignora novo termo se igual ao prévio.
      distinctUntilChanged(),
      // Toda vez que o termo mudar, realiza a busca novamente.
      switchMap((term: string) => this.heroService.searchHero(term))
    );
    
  }
}
