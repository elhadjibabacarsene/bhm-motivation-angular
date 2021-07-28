import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {RegistrationComponent} from "./registration.component";
import {RecommandationComponent} from "./recommandation/recommandation.component";
import {SubscribeComponent} from "./subscribe/subscribe.component";
import {ResultatComponent} from "./recommandation/resultat/resultat.component";



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RegistrationComponent,
        children: [
          {
            path: '',
            component: RecommandationComponent
          },
          {
            path: 'result-recommandation',
            component: ResultatComponent
          },
          {
            path: 'subscribe',
            component: SubscribeComponent
          }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
