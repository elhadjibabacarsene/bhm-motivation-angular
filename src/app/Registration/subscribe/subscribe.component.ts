import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from "@ngrx/store";
import {RegistrationState} from "../store/registration.state";
import {getRecommandationSelector} from "../state/recommandation.selector";
import {ResultRecommandation} from "../models/recommandation.model";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
  result: ResultRecommandation | null | undefined;


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

  constructor(private store : Store<RegistrationState>) { }

  ngOnInit(): void {

    this.store.select(getRecommandationSelector).subscribe((data) => {
      this.result = data;
    })
  }

  get prenom () {return this.subscribeForm.get('prenom')}
  get nom () {return this.subscribeForm.get('nom')}
  get sexe () {return this.subscribeForm.get('sexe')}
  get email () {return this.subscribeForm.get('email')}
  get telephone () {return this.subscribeForm.get('telephone')}
  get password () {return this.subscribeForm.get('password')}
  get confirmPassword () {return this.subscribeForm.get('confirmPassword')}
}
