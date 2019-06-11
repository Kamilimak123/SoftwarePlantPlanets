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
  planetsList: any = [];
  planetsCount: number;
  planetsNext: string;
  constructor(private planetsService: PlanetsService) { }
  planetsUrl = 'https://swapi.co/api/planets/';

  isLoading = true;

  showPlanets() {
    this.planetInfo = [];
    this.planetsService.getPlanets(this.planetsUrl + document.URL.split('/')[4]).subscribe((data: {}) => {
      //console.log(data);
      this.planetInfo = data;
      this.isLoading = false;
    });

  }

  ngOnInit() {
    this.showPlanets();
  }

}
