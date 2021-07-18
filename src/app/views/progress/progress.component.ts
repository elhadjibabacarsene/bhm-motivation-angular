import {AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList} from '@angular/core';
import {ProgressHelperService} from "./progress-helper.service";
import {Status, UiHelper} from "./uiHelper";
import {ProgressStepComponent} from "./progress-step/progress-step.component";

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent extends UiHelper implements OnInit, AfterContentInit {

  itemLength!: number;

  @Input() public set selectedIndex(value: any){
    this.activeIndex = value || 0;
  }

  @Output() public stateChange = new EventEmitter<{
    activeIndex: number;
    activeStep: ProgressStepComponent;
  }>();

  @ContentChildren(ProgressStepComponent) public steps!: QueryList<ProgressStepComponent>


  constructor(protected progressHelper: ProgressHelperService) {
    super(progressHelper);
  }

  ngOnInit(): void {
    this.progressHelper.eventHelper.subscribe({
      next: ({prev, next}) => {
        if(next){
          this.next();
        }
        if(prev){
          this.prev();
        }
      }
    })
  }

  ngAfterContentInit() {
    this.initProgress(this.progressSteps.length);
    this.setActiveStep(this.activeIndex);
    this.initStepIndex();
  }

  private initStepIndex(){
    this.progressSteps.forEach((step, i) => (step.stepIndex = i))
  }

  public get activeStep(): ProgressStepComponent {
    return this.progressSteps[this.activeIndex];
  }

  private get progressSteps(): ProgressStepComponent[] {
    return this.steps.toArray()
  }

  private get stepsExist(): boolean{
    return this.progressSteps && Array.isArray(this.progressSteps);
  }

  private initProgress(value: any): void{
    this.itemLength = value || 0;
    this.itemProgressList = this.generateProgressArray(this.itemLength)
  }

  private generateProgressArray(length: number): { stepIndex: number; status: string }[] {
    return [...Array(length).keys()].map((key) => {
      return {
        stepIndex: key,
        status: key === this.activeIndex ? Status.IN_PROGRESS : Status.PENDING
      }
    });
  }

  private setActiveStep(activeIndex: number) {
    if(this.stepsExist){
      this.removeActiveStep();
      this.updateActiveStep(activeIndex);
    }
  }

  private updateActiveStep(index: any) {
    this.progressSteps[index].activeState = this.progressSteps[index];
  }

  private removeActiveStep() {
    this.progressSteps.map((step) => {
      if(step.isActive){
        step.isActive = false;
      }
    })
  }

  public next() {
    this.increaseStep();
  }

  public prev() {
    this.decreaseStep();
  }

  increaseStep() {
    if(this.activeIndex === this.itemLength -1 &&
      this.itemProgressList[this.activeIndex].status !== Status.COMPLETED){
      this.completeLastStep();
    }

    if(this.activeIndex < this.itemLength - 1){
      this.activeIndex++;
      this.switchStatusNext(this.activeIndex);
      this.setActiveStep(this.activeIndex);
    }
  }

  decreaseStep() {
    if(this.activeIndex === this.itemLength -1 &&
      this.itemProgressList[this.activeIndex].status === Status.COMPLETED)
    {
      this.undoLastComplete();
    }else{
      if(this.activeIndex > 0) {
        this.activeIndex --;
        this.switchStatusPrev(this.activeIndex);
        this.setActiveStep(this.activeIndex);
        this.emitStateChange();
      }
    }
  }
  private emitStateChange(): void {
    this.stateChange.emit({
      activeIndex: this.activeIndex,
      activeStep: this.activeStep,
    });
  }
}
