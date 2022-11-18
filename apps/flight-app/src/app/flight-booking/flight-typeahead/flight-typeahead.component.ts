import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Flight } from '@flight-workspace/flight-lib';
import { debounceTime, delay, distinctUntilChanged, filter, Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'flight-workspace-flight-typeahead',
  templateUrl: './flight-typeahead.component.html',
  styleUrls: ['./flight-typeahead.component.css'],
})
export class FlightTypeaheadComponent {
  control = new FormControl('', { nonNullable: true });
  flights$ = this.getFlightsStream();
  loading = false;

  constructor(private http: HttpClient) { }

  getFlightsStream(): Observable<Flight[]> {
    /**
     * Stream 1: Input value changes
     *  - Trigger
     *  - Data/State Provider
     */
    return this.control.valueChanges.pipe(
      // Filtering START
      filter(city => city.length > 2),
      debounceTime(300),
      distinctUntilChanged(),
      // Filtering END
      // Side-effect: Loading State
      tap(() => this.loading = true),
      delay(1_000),
      /**
       * Stream 2: Http Backend Call
       *  - Data/State Provider
       */
      switchMap(city => this.load(city)),
      // Side-effect: Loading State
      tap(() => this.loading = false)
    );
  }

  /**
   * Stream 2: Http Backend Call
   *  - Data/State Provider
   */
  load(from: string): Observable<Flight[]> {
    const url = "http://www.angular.at/api/flight";

    const params = new HttpParams()
      .set('from', from);

    const headers = new HttpHeaders()
      .set('Accept', 'application/json');

    return this.http.get<Flight[]>(url, { params, headers });
  }

}
