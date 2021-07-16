import {HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RegistrationModule} from "./Registration/registration.module";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NG_VALIDATORS} from "@angular/forms";
import {validationNumField} from "./shared/validations/numeric.directive";
import {PrimengModule} from "./shared/modules/primeng.module";
import { ProgressComponent } from './views/progress/progress.component';
import { ProgressStepComponent } from './views/progress/progress-step/progress-step.component';

@NgModule({
  declarations: [
    AppComponent,
    ProgressComponent,
    ProgressStepComponent,
  ],
  imports: [
    BrowserModule,
    RegistrationModule,
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
    PrimengModule

  ],
  providers: [
    {provide: NG_VALIDATORS, useExisting: validationNumField, multi: true}
  ],
  exports: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
