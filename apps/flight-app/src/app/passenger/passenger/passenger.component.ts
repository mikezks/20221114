import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromPassengers from '../+state';


@Component({
  selector: 'flight-workspace-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.css'],
})
export class PassengerComponent implements OnInit {
  passengers$ = this.store.select(fromPassengers.selectAll);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(
      fromPassengers.addPassengers({ passengers: [
        { id: 1, name: 'Max' },
        { id: 2, name: 'Susi' }
      ]})
    );
  }
}
