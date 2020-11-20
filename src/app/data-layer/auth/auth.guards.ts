import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import {combineLatest, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private readonly store: Store<any>, private readonly router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

  }
}

@Injectable({
  providedIn: 'root',
})
export class AutoLoginGuard implements CanActivate {
  constructor(private readonly store: Store<any>, private readonly router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

  }
}
