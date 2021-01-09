import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LocalStorageKeys } from '../enums/common.enums';
import {
  AuthSignInReqDto,
  AuthSignInRes,
  AuthSignInResDto,
  FormSignInModel,
} from '../models/auth.models';
import { AppState } from '../store';
import {
  getAuthDataCondition,
  getAuthToken,
} from '../store/core/auth/auth.selectors';

enum Postfixes {
  SING_IN = 'singin',
  LOGIN = 'login',
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient, private store: Store<AppState>) {}

  singIn(formModel: FormSignInModel): Observable<AuthSignInResDto> {
    const requestData = new AuthSignInReqDto(formModel);
    return this.httpClient
      .post<AuthSignInRes>(`${this.baseUrl}/${Postfixes.SING_IN}`, requestData)
      .pipe(map((res) => new AuthSignInResDto(res)));
  }

  login(token: string): Observable<AuthSignInResDto> {
    const requestData = { token };
    return this.httpClient
      .post<AuthSignInRes>(`${this.baseUrl}/${Postfixes.LOGIN}`, requestData)
      .pipe(map((res) => new AuthSignInResDto(res)));
  }

  removeTokenFromLocalStorage(): void {
    window.localStorage.removeItem(LocalStorageKeys.AUTH_TOKEN);
  }

  getTokenFromLocalStorage(): string | null {
    const localStorageToken = window.localStorage.getItem(
      LocalStorageKeys.AUTH_TOKEN
    );
    return localStorageToken;
  }

  getTokenFromStore(): Observable<string | null> {
    return this.store.pipe(select(getAuthToken));
  }

  isUserLogged(): Observable<boolean> {
    return this.store.pipe(
      select(getAuthDataCondition),
      filter((state) => !state.isLoading),
      take(1),
      map((state) => state.isSuccess)
    );
  }
}
