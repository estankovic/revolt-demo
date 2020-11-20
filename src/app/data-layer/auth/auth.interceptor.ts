import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {switchMap, take} from 'rxjs/operators';
import {$accessToken} from './auth.selectors';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly store: Store) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select($accessToken).pipe(
      take(1),
      switchMap(token => {
        let authReq = req;
        if (token != null) {
          authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
        }
        return next.handle(authReq);
      })
    );
  }
}
