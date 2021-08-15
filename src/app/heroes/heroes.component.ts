import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  selectedHero?: Hero;
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  heroes: Hero[] = [];
  
  
  constructor(
  // Injeta o serviço no componente.
    private heroService: HeroService
  ) {}

  // Consumo do serviço.
  getHeroes(): void {
    // subscribe() passa a retornar a lista á um callback.
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  
  }

  // ngOnInit faz parte do ciclo de vida do componente, onde executa o código após a construção do componente.
  ngOnInit(): void {
    this.getHeroes();
  }
}
