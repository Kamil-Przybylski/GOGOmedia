import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FormSignInModel } from '../../models/auth.models';
import { HttpErrorData } from '../../models/http.models';
import { AppState } from '../../store';
import { authSingInAction } from '../../store/core/auth/auth.actions';
import {
  getAuthDataCondition,
  getAuthIsProcessing,
  getAuthSingInError,
} from '../../store/core/auth/auth.selectors';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [],
})
export class LoginPageComponent implements OnInit {
  isProcessing$!: Observable<boolean>;
  httpError$!: Observable<HttpErrorData | null>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.isProcessing$ = this.store.pipe(select(getAuthIsProcessing));
    this.httpError$ = this.store.pipe(select(getAuthSingInError));
  }

  onLogin(formModel: FormSignInModel) {
    this.store.dispatch(authSingInAction({ payload: { formModel } }));
  }
}
