import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FeatureGuard} from "./Features/feature.guard";

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./Login/login.module').then(m => m.LoginModule),
    canLoad: [FeatureGuard],
    data: {
      feature: "login"
    }
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'registration',
    loadChildren: () => import('./Registration/registration.module').then(m => m.RegistrationModule),
    canLoad: [FeatureGuard],
    data: {
      feature: "registration"
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
