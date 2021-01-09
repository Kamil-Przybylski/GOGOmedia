import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  authInitialLoginAction,
  authInitialLoginFailAction,
  authInitialLoginSuccessAction,
  authLogoutAction,
  authSingInAction,
  authSingInFailAction,
  authSingInSuccessAction,
} from './auth.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpUtils } from '../../../utils/http.utils';
import { Router } from '@angular/router';
import { AppRoutes } from '../../../../app.routes';
import { LocalStorageKeys } from '../../../enums/common.enums';

@Injectable()
export class AuthEffects {
  singIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authSingInAction),
      map((action) => action.payload),
      switchMap(({ formModel }) =>
        this.authService.singIn(formModel).pipe(
          map((res) =>
            authSingInSuccessAction({
              payload: { authUser: res.authUser, token: res.token },
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              authSingInFailAction({
                payload: { error: HttpUtils.getHttpErrorResponse(error) },
              })
            )
          )
        )
      )
    )
  );

  singInSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authSingInSuccessAction),
        map((action) => action.payload),
        tap(({ token }) => {
          window.localStorage.setItem(LocalStorageKeys.AUTH_TOKEN, token);
          this.router.navigate([AppRoutes.DASHBOARD]);
        })
      ),
    { dispatch: false }
  );

  initialLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authInitialLoginAction),
      map((action) => action.payload),
      switchMap(({ token }) =>
        this.authService.login(token).pipe(
          map((res) =>
            authInitialLoginSuccessAction({
              payload: { authUser: res.authUser, token: res.token },
            })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              authInitialLoginFailAction({
                // can't add the HttpErrorResponse class to Store
                payload: { error: HttpUtils.getHttpErrorResponse(error) },
              })
            )
          )
        )
      )
    )
  );

  initialLoginFail$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authInitialLoginFailAction),
        tap(() => this.authService.removeTokenFromLocalStorage())
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authLogoutAction),
        tap(() => {
          this.authService.removeTokenFromLocalStorage();
          window.location.reload();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
