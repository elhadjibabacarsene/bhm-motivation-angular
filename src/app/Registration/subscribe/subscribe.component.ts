import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
  /*isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;*/

  subscribeForm = new FormGroup({
    prenom: new FormControl('', Validators.required),
    nom: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    sexe: new FormControl('', Validators.required)
  })

  constructor() { }

  ngOnInit(): void {/*
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });*/
  }

  get prenom () {return this.subscribeForm.get('prenom')}
  get nom () {return this.subscribeForm.get('nom')}
  get sexe () {return this.subscribeForm.get('sexe')}
  get email () {return this.subscribeForm.get('email')}
  get telephone () {return this.subscribeForm.get('telephone')}
  get password () {return this.subscribeForm.get('password')}
  get confirmPassword () {return this.subscribeForm.get('confirmPassword')}
}
