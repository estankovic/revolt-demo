import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {routerReducer, StoreRouterConnectingModule, RouterState} from '@ngrx/router-store';
import {AuthModule} from './data-layer/auth/auth.module';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {authMetaReducer} from './data-layer/auth/auth.meta-reducer';
import {AuthInterceptor} from './data-layer/auth/auth.interceptor';
import {VehiclesModule} from './data-layer/vehicles/vehicles.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot({
      router: routerReducer,
    }, {
      metaReducers: [authMetaReducer]
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 75
    }),
    EffectsModule.forRoot(),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,
    }),
    AuthModule,
    VehiclesModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
