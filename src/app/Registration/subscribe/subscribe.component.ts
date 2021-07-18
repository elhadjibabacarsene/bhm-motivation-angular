import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from "@ngrx/store";
import {RegistrationState} from "../store/registration.state";
import {getRecommandationSelector} from "../state/recommandation.selector";
import {ResultRecommandation} from "../models/recommandation.model";
import Validation from "../../shared/validations/confirm-password.validator";
import Swal from "sweetalert2";


@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
  result: ResultRecommandation | null | undefined;

  subscribeForm = new FormGroup({
      prenom: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255)
      ]),
      nom: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(255)
      ]),
      telephone: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(50)]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(255)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
      confirmPassword: new FormControl('', [
        Validators.required]),
      sexe: new FormControl('Homme', Validators.required),
      duree: new FormControl('3 mois')
    },
    {
      validators: [Validation.match('password', 'confirmPassword')]
    }
  )

  constructor(private store: Store<RegistrationState>) {
  }


  get prenom() {
    return this.subscribeForm.get('prenom')
  }

  get nom() {
    return this.subscribeForm.get('nom')
  }

  get sexe() {
    return this.subscribeForm.get('sexe')
  }

  get email() {
    return this.subscribeForm.get('email')
  }

  get telephone() {
    return this.subscribeForm.get('telephone')
  }

  get password() {
    return this.subscribeForm.get('password')
  }

  get confirmPassword() {
    return this.subscribeForm.get('confirmPassword')
  }

  ngOnInit(): void {
  }


  paymentStripe() {
    Swal.fire({
      html: `
            <p class="text-lg text-gray-900">Programme summer body</p>
            <form id="payment-form">
              <div id="card-element"><!--Stripe.js injects the Card Element--></div>

              <button id="submit" class="bg-yellow-500 rounded p-3 text-white">

                <div class="spinner hidden" id="spinner"></div>

                <span id="button-text">Pay now</span>

              </button>

              <p id="card-error" role="alert"></p>

              <p class="result-message hidden">

                Payment succeeded, see the result in your

                <a href="" target="_blank">Stripe dashboard.</a> Refresh the page to pay again.

              </p>
            </form>
      `,
      focusConfirm: false,
      preConfirm: () => {
        // @ts-ignore
        const login = Swal.getPopup()?.querySelector('#login')?.value
        // @ts-ignore
        const password = Swal.getPopup()?.querySelector('#password')?.value
        if (!login || !password) {
          Swal.showValidationMessage(`Please enter login and password`)
        }
        return {login: login, password: password}
      }
    }).then((result) => {
      Swal.fire(`
    Login: ${result.value?.login}
    Password: ${result.value?.password}
  `.trim())
    })
  }
}
