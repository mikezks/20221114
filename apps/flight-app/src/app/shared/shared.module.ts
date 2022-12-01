import {CommonModule} from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ModuleWithProviders} from '@angular/core';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import {CityPipe} from './pipes/city.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CityPipe,
  ],
  exports: [
    CityPipe
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ]
    }
  }

  static forChild(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: []
    }
  }

}
