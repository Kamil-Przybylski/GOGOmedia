import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, take, tap } from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';
import { AppState } from './core/store';
import { authInitialLoginAction } from './core/store/core/auth/auth.actions';
import { getAuthDataCondition } from './core/store/core/auth/auth.selectors';

@Injectable()
export class AppInitialProvider {
  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {}

  // if token exist download User, else return (resolve)
  init(): Promise<void> {
    const token = this.authService.getTokenFromLocalStorage();

    return new Promise((resolve, reject) => {
      if (!token) resolve();
      else {
        this.store.dispatch(authInitialLoginAction({ payload: { token } }));
        this.store
          .pipe(
            select(getAuthDataCondition),
            filter((dataCondition) => !dataCondition.isLoading),
            take(1),
            tap(() => resolve())
          )
          .subscribe();
      }
    });
  }
}

export function appInitialProviderFactory(provider: AppInitialProvider) {
  return () => provider.init();
}
