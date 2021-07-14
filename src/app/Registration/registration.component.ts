import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  activeComponent = 'recommandation';

  constructor() { }

  ngOnInit(): void {
  }



  loadResultComponent(name: string) {
      this.activeComponent = name;
  }
  loadSubscribeComponent(name: string) {
      this.activeComponent = name;
  }

}
