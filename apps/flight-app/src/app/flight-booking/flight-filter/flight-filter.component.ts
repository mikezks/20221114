import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComponentStore } from '@ngrx/component-store';
import { FlightFilter } from '../entities/flight-filter';


export interface LocalState {
  filters: FlightFilter[];
}

export const initialLocalState: LocalState = {
  filters: []
};


@Component({
  selector: 'flight-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './flight-filter.component.html',
  styleUrls: ['./flight-filter.component.css'],
  providers: [
    ComponentStore
  ]
})
export class FlightFilterComponent {
  @Input() set filter(filter: FlightFilter) {
    this.filterForm.setValue(filter);
  }

  @Output() searchTrigger = new EventEmitter<FlightFilter>();

  filterForm = this.fb.nonNullable.group({
    from: ['', [Validators.required]],
    to: ['', [Validators.required]],
    urgent: [false]
  });

  selectedFilter = new FormControl(this.filterForm.getRawValue(), { nonNullable: true });

  /**
   * Updater
   */

  addFilter = this.localStore.updater(
    (state, filter: FlightFilter) => ({
      ...state,
      filters: [
        ...state.filters,
        filter
      ]
    })
  );

  /**
   * Selectors
   */

  selectFilters$ = this.localStore.select(
    // Selectors

    // Projector
    state => state.filters
  );

  selectLastFilters$ = this.localStore.select(
    // Selectors
    this.selectFilters$,
    // Projector
    filters => filters.slice(-1)[0]
  );


  constructor(
    private fb: FormBuilder,
    private localStore: ComponentStore<LocalState>) {

    this.localStore.setState(initialLocalState);
  }

  search(): void {
    this.addFilter(this.filterForm.getRawValue());
    this.searchTrigger.next(this.filterForm.getRawValue());
  }
}
