import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'registration',
    loadChildren: () => import('./Registration/registration.module').then(m => m.RegistrationModule),
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
