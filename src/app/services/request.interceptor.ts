import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpContextToken,
  HttpHeaders
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth/auth.service';

export const NO_AUTH = new HttpContextToken(() => false);

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers;

    if (!request.context.get(NO_AUTH)) {
      headers = new HttpHeaders({
        Authorization: `Bearer ${this.authService.user?.access_token}`,
      });
    }

    request = request.clone({ headers });

    return next.handle(request).pipe(
      tap({
        next: (res: any) => {},
        error: (err: any) => {
          if (!request.context.get(NO_AUTH)) {
            if (err.status === 401) {
              this.authService.logout();
            }
          }
        },
      })
    );
  }
}
