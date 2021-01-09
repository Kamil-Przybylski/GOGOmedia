import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { AuthUser } from '../../../core/models/auth.models';
import { AppState } from '../../../core/store';
import { authLogoutAction } from '../../../core/store/core/auth/auth.actions';
import { getAuthUser } from '../../../core/store/core/auth/auth.selectors';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styles: [],
})
export class DashboardPageComponent implements OnInit {
  authUser$!: Observable<AuthUser | null>;
  isTestError: boolean = false;

  constructor(private store: Store<AppState>, private http: HttpClient) {}

  ngOnInit(): void {
    this.authUser$ = this.store.pipe(select(getAuthUser));
  }

  // only to show test
  testInterceptor() {
    this.http
      .get(environment.baseUrl, { observe: 'response' })
      .pipe(
        take(1),
        catchError((error) => {
          this.isTestError = true;
          return of(error);
        })
      )
      .subscribe();
  }

  logout() {
    this.store.dispatch(authLogoutAction());
  }
}
