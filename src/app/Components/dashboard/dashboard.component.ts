import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/hero';
import { HeroService } from '../../Services/hero.service';
import { APIHero } from 'src/app/interfaces/apihero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  shuffle = (array: any[]) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  }; 

  getHeroes(): void {
     this.heroService.getHeroesAPI().subscribe((data) => {
      var list = <APIHero[]>data
      list.forEach(e => {
        this.heroes.push({id: e.id, name: e.name, image_url: e.images.sm})
      })
      this.heroes = this.shuffle(this.heroes).slice(1, 6)
    });  
  }
}