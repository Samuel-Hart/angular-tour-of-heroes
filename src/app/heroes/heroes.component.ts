import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService }  from '../hero.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

  heroes: Hero[];
  selectedHero: Hero;
  selectedHeroes: Map<Hero["id"], Hero>;
  

  constructor(private heroService: HeroService, private messageService: MessageService) {}
  
  ngOnInit() {
    this.getHeroes();
    if(this.selectedHeroes === undefined)
      this.selectedHeroes = new Map<Hero["id"], Hero>();
  }
  
  onSelect(hero: Hero, source?: string): void {
    let sourceval = (source === undefined) ? "." : " from " + source +".";
    
    this.selectedHero = hero;
    this.selectedHeroes.set(this.selectedHero.id, this.selectedHero);
    this.messageService.add("Selected "+ this.selectedHero.name + sourceval);
  }
 
  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  getSelectedHeroes(): Hero[] {
    return Array.from(this.selectedHeroes.values());
  }

}

