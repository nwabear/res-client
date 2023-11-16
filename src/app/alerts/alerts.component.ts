import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Search} from "../location.model";
import {ResService} from "../res.service";
import {MatTableModule} from "@angular/material/table";
import {RouterOutlet} from "@angular/router";
import {Router} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule, MatTableModule, RouterOutlet, MatButtonModule],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css'
})
export class AlertsComponent implements OnInit {
  searches: Search[] = [];

  displayedColumns: string[] = ['locationId', 'date', 'time', 'partySize', 'description', 'delete'];

  constructor(private resService: ResService, private router: Router) {}

  ngOnInit() {
    this.getAlerts();
  }

  getAlerts() {
    this.resService.getSearches()
      .subscribe(searches => this.updateView(searches));
  }

  updateView(searches: Search[]) {
    this.searches = searches;
  }

  deleteRow(row: Search) {
    this.resService.deleteSearch(row.id)
      .subscribe(_ => window.location.reload());
  }
}
