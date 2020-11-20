import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, map, switchMap, take} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {$isLoggedIn} from './auth.selectors';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(
    private readonly router: Router,
    private readonly store: Store
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(response => {
        return this.store.select($isLoggedIn).pipe(
          take(1),
          switchMap(isLoggedIn => {
            if (isLoggedIn && this.shouldBeIntercepted(response)) {
              this.router.navigate(['login']);
            }
            return throwError(response);
          })
        );
      })
    );
  }

  shouldBeIntercepted(response: HttpResponse<any>) {
    return [401, 403].includes(response.status);
  }
}
