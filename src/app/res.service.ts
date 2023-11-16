import { Injectable } from '@angular/core';
import {catchError, Observable, tap} from "rxjs";
import { Location } from "./location.model";
import { Search } from "./location.model";
import {HttpClient} from "@angular/common/http";
import { DatePipe } from "@angular/common";
import {SearchComponent} from "./search/search.component";

@Injectable({
  providedIn: 'root'
})
export class ResService {
  private resUrl = 'http://localhost:3000/locations';
  private searchUrl = 'http://localhost:3000/searches';

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe
  ) {}

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.resUrl);
  }

  addSearch(location: string, date: Date, time: string, partySize: number, description: string) {
    let search = {
      locationId: location,
      date: this.datePipe.transform(date, "yyyy-MM-dd"),
      time: time,
      partySize: partySize,
      description: description
    };

    return this.http.post(this.searchUrl, search);
  }

  getSearches(): Observable<Search[]> {
    return this.http.get<Search[]>(this.searchUrl);
  }

  deleteSearch(id: string | undefined) {
    console.log(this.searchUrl + "/" + id);
    return this.http.delete(this.searchUrl + "/" + id);
  }
}
