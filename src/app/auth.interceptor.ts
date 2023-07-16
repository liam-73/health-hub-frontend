import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, take } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.admin.pipe(
      take(1),
      exhaustMap((admin) => {
        if (!admin || !admin.token) {
          return next.handle(req);
        }

        const modifiedReq = req.clone({
          setHeaders: { Authorization: 'Bearer ' + admin.token },
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
