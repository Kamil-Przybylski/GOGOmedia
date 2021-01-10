import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, InjectionToken, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppState, reducers } from './core/store';
import { AuthEffects } from './core/store/core/auth/auth.effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpInterceptor } from './app-http-interceptor';
import {
  AppInitialProvider,
  appInitialProviderFactory,
} from './app-initial.provider';

const REDUCER_TOKEN = new InjectionToken<ActionReducerMap<AppState>>(
  'root reducer'
);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,

    StoreModule.forRoot(REDUCER_TOKEN, {
      runtimeChecks: {
        strictActionImmutability: true,
        strictActionSerializability: true,
        strictStateImmutability: true,
        strictStateSerializability: true,
      },
    }),
    EffectsModule.forRoot([AuthEffects]),

    StoreDevtoolsModule.instrument({
      maxAge: 100,
      logOnly: environment.production,
    }),
  ],
  providers: [
    { provide: REDUCER_TOKEN, useValue: reducers },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true,
    },

    // Initiaalizer for download AuthUser if token is in localStorage
    AppInitialProvider,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitialProviderFactory,
      deps: [AppInitialProvider],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
