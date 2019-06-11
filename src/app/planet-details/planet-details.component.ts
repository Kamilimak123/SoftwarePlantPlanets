import { Component, OnInit } from '@angular/core';
import { PlanetsService } from '../planets/planets.service';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  providers: [PlanetsService],
  styleUrls: ['./planet-details.component.scss']
})
export class PlanetDetailsComponent implements OnInit {
  planetInfo: any = [];
  planetsUrl = 'https://swapi.co/api/planets/';
  isLoading = true;

  constructor(private planetsService: PlanetsService) { }

  showInfo() {
    this.planetInfo = [];
    this.planetsService.getPlanets(this.planetsUrl + document.URL.split('/')[document.URL.split('/').length - 1]).subscribe((data: {}) => {
      this.planetInfo = data;
      this.isLoading = false;
    });
  }

  ngOnInit() {
    this.showInfo();
  }
}
