import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import { pipe, map } from 'rxjs';
import * as fromFlightBooking from './flight-booking.reducer';

export const selectFlightBookingState = createFeatureSelector<fromFlightBooking.State>(
  fromFlightBooking.flightBookingFeatureKey
);

export const selectFlights = createSelector(
  // Selectors
  selectFlightBookingState,
  // Projector
  state => state.flights
);

export const selectPassengers = createSelector(
  selectFlightBookingState,
  (state) => state.passenger
);

export const selectBookings = createSelector(
  selectFlightBookingState,
  (state) => state.bookings
);

export const selectUser = createSelector(
  selectFlightBookingState,
  (state) => state.user
);

export const selectActiveUserFlights = createSelector(
  // Selectors
  selectFlights,
  selectBookings,
  selectUser,
  // Projector
  (flights, bookings, user) => {
    const activeUserPassengerId = user.passengerId;
    const activeUserFlightIds = bookings
      .filter(b => b.passengerId === activeUserPassengerId)
      .map(b => b.flightId);
    const activeUserFlights = flights
      .filter(f => activeUserFlightIds.includes(f.id));

    return activeUserFlights;
  }
);


export const selectDelayedRxJSOperator = () =>
  pipe(
    // RxJS operator to select state from store
    select(selectFlights),
    // RxJS map operator
    map(flights =>
      // Array filter function
      flights.filter(f => f.delayed)
    )
  );

export const selectItemsByFilter =
  <T, K>(
    mapFn: (state: T) => Array<K>,
    filter: (item: K) => boolean
  ) => pipe(
    // RxJS operator to select state from store
    select(mapFn),
    // RxJS map operator
    map(arr =>
      // Array filter function
      arr.filter(filter)
    )
  );
