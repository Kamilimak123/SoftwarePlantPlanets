import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlanetDetailsComponent }  from './planet-details/planet-details.component';


const routes: Routes = [{ path: 'planet/:id', component: PlanetDetailsComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
