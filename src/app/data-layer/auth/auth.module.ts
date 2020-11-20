import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {AuthEffects} from './auth.effects';
import {authReducer} from './auth.reducer';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth.guards';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class AuthModule {
}
