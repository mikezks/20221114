import { createFeatureSelector } from '@ngrx/store';
import * as fromPassengers from "./passenger.reducer";


export const selectPassengerState = createFeatureSelector<fromPassengers.State>(fromPassengers.passengersFeatureKey);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = fromPassengers.adapter.getSelectors(selectPassengerState);
