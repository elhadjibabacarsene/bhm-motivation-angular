import {HttpClientModule } from '@angular/common/http';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxStripeModule} from "ngx-stripe";
import {FeatureFlagsService} from "./Features/feature-flags.service";
import { LoginComponent } from './Login/login.component';
import { ToastrModule } from 'ngx-toastr';

//Chargement des status des fonctionnalités depuis l'Api
const featureFactory = (featureFlagsService: FeatureFlagsService) => () => featureFlagsService.loadConfig();

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    BrowserAnimationsModule,
    NgxStripeModule.forRoot('pk_test_51Ib1WgEnjYEZm3mXOHrCuNIGw4TdxpXBQTEITJsPKQShb9NzPbDj4nV7SVb08fv05XOT98aEsKeB2b0MgiyGhL5900MXTAWkcS'),
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: featureFactory,
      deps: [FeatureFlagsService],
      multi: true
    }
  ],
  exports: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
