import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchComponent} from "./search/search.component";
import {AlertsComponent} from "./alerts/alerts.component";

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'alerts', component: AlertsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
