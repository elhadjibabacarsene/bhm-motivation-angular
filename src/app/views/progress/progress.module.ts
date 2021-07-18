import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProgressComponent} from "./progress.component";
import {ProgressStepComponent} from "./progress-step/progress-step.component";
import {ProgressStepDirective} from "./progress-step.directive";



@NgModule({
  declarations: [
    ProgressComponent,
    ProgressStepComponent,
    ProgressStepDirective,
  ],
  exports: [
    ProgressComponent,
    ProgressStepComponent,
    ProgressStepDirective
  ],
  imports: [
    CommonModule
  ]
})
export class ProgressModule { }
