import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { RegistrationComponent } from './registration.component';
import {RegistrationRoutingModule} from "./registration-routing.module";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {RecommandationComponent} from "./recommandation/recommandation.component";
import { ResultatComponent } from './recommandation/resultat/resultat.component';

import {EffectsModule} from "@ngrx/effects";
import {RecommandationEffects} from "./state/recommandation.effects";
import {StoreModule} from "@ngrx/store";
import {RECOMMANDATION_STATE_NAME} from "./state/recommandation.selector";
import {registrationReducer} from "./store/registration.state";
import {MatStepperModule} from "@angular/material/stepper";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    SubscribeComponent,
    RegistrationComponent,
    RecommandationComponent,
    ResultatComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegistrationRoutingModule,
    RouterModule,
    StoreModule.forFeature(RECOMMANDATION_STATE_NAME, registrationReducer),
    EffectsModule.forFeature([RecommandationEffects]),
    MatStepperModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,

  ]
})
export class RegistrationModule { }
