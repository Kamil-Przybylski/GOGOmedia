import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AuthService } from './core/services/auth.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  token$: Observable<string | null>;

  constructor(private authService: AuthService) {
    this.token$ = this.authService.getTokenFromStore();
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.token$.pipe(
      take(1),
      switchMap((token) => {
        if (!token) return next.handle(request);

        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });

        return next.handle(request);
      })
    );
  }
}
