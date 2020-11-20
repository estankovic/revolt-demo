import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {
  constructor(private readonly router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(response => {
        if (this.shouldBeIntercepted(response)) {
          this.router.navigate(['login']);
        }
        return throwError(response);
      })
    );
  }

  shouldBeIntercepted(response: HttpResponse<any>) {
    return [401, 403].includes(response.status);
  }
}
