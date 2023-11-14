import {Component, OnInit} from '@angular/core';
import {AsyncPipe, CommonModule} from '@angular/common';
import {ResService} from "../res.service";
import {Location} from "../location.model";
import {RouterOutlet} from "@angular/router";
import {
  Form,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {map, Observable, startWith} from "rxjs";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatCardModule} from "@angular/material/card";
import {MatRadioModule} from "@angular/material/radio";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatSelectModule} from "@angular/material/select";
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatInputModule, FormsModule, MatDatepickerModule, MatAutocompleteModule, AsyncPipe, ReactiveFormsModule, MatCardModule, MatRadioModule, MatCheckboxModule, MatSelectModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  locations: Location[] = [];
  options: string[] = [];

  filteredOptions: Observable<string[]> = new Observable<string[]>();

  timeNames: string[] = ["BREAKFAST", "BRUNCH", "LUNCH", "DINNER"]
  partySize: number = 0;
  description: string = "";

  searchForm = this.formBuilder.group({
    location: [''],
    date: [''],
    time: [''],
    partySize: [''],
    description: ['']
  });

  constructor(private resService: ResService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.getLocations();
    // @ts-ignore
    this.filteredOptions = this.searchForm.get('location').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  getLocations() {
    this.resService.getLocations()
      .subscribe(locations => this.updateView(locations));
  }

  onSubmit() {
    let locationId = "";
    // @ts-ignore
    let locationName = this.searchForm.get('location').value;

    // @ts-ignore
    let times: string[] = this.searchForm.get('time').value;

    let timesString = times.map(time => time).join(",");

    this.locations.forEach(location => locationId = (locationName == location.name) ? location.id : locationId);
    // @ts-ignore
    this.resService.addSearch(locationId, this.searchForm.get('date').value, timesString, this.searchForm.get('partySize').value, this.searchForm.get('description').value)
      .subscribe(search => console.log(search));
  }

  private updateView(locations: Location[]) {
    this.locations = locations;
    this.options = this.locations.map(location => location.name);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().startsWith(filterValue));
  }
}
