import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { BasketComponent } from './basket/basket.component';
import { HomeComponent } from './home/home.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'flight-booking',
    loadChildren: () => import('./flight-booking/flight-booking.module')
      .then(esm => esm.FlightBookingModule),
    data: {
      preloading: true
    }
  },
  {
    path: 'mf-passenger',
    loadChildren: () => loadRemoteModule<{ PassengerModule: any }>({
      type: 'module',
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      exposedModule: './module'
    })
      .then(esm => esm.PassengerModule)
  },
  {
    path: 'basket',
    component: BasketComponent,
    outlet: 'aux'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
