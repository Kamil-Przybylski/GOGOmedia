import { Injectable } from '@angular/core';
import { Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AppRoutes } from '../../app.routes';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(): Observable<boolean> {
    return this.authService.isUserLogged().pipe(
      tap((isLoginSuccess) => {
        if (!isLoginSuccess) this.router.navigate([AppRoutes.LOGIN]);
      })
    );
  }
}
