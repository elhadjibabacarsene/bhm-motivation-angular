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
import {ProgressModule} from "../views/progress/progress.module";


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
        ProgressModule

    ]
})
export class RegistrationModule { }
