import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/hero';
import { HEROES } from '../Data/MockData/mock-heroes';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';
import { APIHero } from '../interfaces/apihero';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService,
    private http: HttpClient) { }

  getMockUpDataHeroes(): Observable<Hero[]> {
    this.getHeroesAPI();
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  getHeroesAPI() {
    const apiUrl = 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json';
    return this.http.get(apiUrl);
  }
}
