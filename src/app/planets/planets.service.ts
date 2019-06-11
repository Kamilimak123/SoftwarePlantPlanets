import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';



@Injectable()
export class PlanetsService {
  constructor(private http: HttpClient) { }
  

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getPlanets(url): Observable<any> {
    return this.http.get(url).pipe(
      map(this.extractData));
  }

}