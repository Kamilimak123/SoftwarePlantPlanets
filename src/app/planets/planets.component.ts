import { Component, OnInit, ViewChild } from '@angular/core';
import { PlanetsService } from './planets.service'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface Element {
  name: string;
}

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  providers: [PlanetsService],
  styleUrls: ['./planets.component.scss']
})

export class PlanetsComponent implements OnInit {
  planets: any = [];
  planetsList: any = [];
  planetsCount: number;
  planetsNext: string;
  constructor(private planetsService: PlanetsService) { }
  planetsUrl = 'https://swapi.co/api/planets/';

  displayedColumns: string[] = ['name', 'climate', 'terrain'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource = new MatTableDataSource<Object>();
  isLoading = true;


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate =
      (data: Element, filter: string) => data.name.toLowerCase().indexOf(filter) != -1;
  }

  showPlanets() {
    this.planets = [];
    this.planetsService.getPlanets(this.planetsUrl).subscribe((data: {}) => {
      //console.log(data);
      this.planets = data;
      this.planetsCount = this.planets.count;
      this.planetsNext = this.planets.next;
      this.planetsList = this.planets.results;
      for (var i = 0; i < (this.planetsCount / 10) - 1; i++) {
        this.planetsService.getPlanets(this.planetsUrl + '?page=' + (i + 2)).subscribe((data: {}) => {
          this.planets = data;
          this.planetsList = this.planetsList.concat(this.planets.results);
          this.dataSource = new MatTableDataSource<Object>(this.planetsList);
          this.isLoading = false;
          this.dataSource.paginator = this.paginator;
          if (this.planetsList.length == this.planetsCount) {
            
            console.log(this.dataSource);
          }
          
        });
      }
    });

  }

  ngOnInit() {
    this.showPlanets();
  }
}
