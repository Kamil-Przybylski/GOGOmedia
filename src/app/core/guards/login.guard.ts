import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppRoutes } from '../../app.routes';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // forbid enter to login-page if user is logged
  canActivate(): Observable<boolean> {
    return this.authService.isUserLogged().pipe(
      map((isLogged) => !isLogged),
      tap((isNotLogged) => {
        if (!isNotLogged) this.router.navigate([AppRoutes.DASHBOARD]);
      })
    );
  }
}
