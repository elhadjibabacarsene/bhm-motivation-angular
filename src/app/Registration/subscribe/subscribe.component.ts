import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from "@ngrx/store";
import {RegistrationState} from "../store/registration.state";
import {ResultRecommandation} from "../models/recommandation.model";
import Validation from "../../shared/validations/confirm-password.validator";
import {StripeCardComponent, StripeService} from "ngx-stripe";
import {PaymentIntent, StripeCardElementOptions} from "@stripe/stripe-js";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {switchMap} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {getRecommandationSelector} from "../state/recommandation.selector";


class StripeElementsOptions {
}

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss']
})
export class SubscribeComponent implements OnInit {
  result: ResultRecommandation | null | undefined;
  @ViewChild(StripeCardComponent) card!: StripeCardComponent;
  proccedPaymentStatus = false;


  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#acb1bc',
        },
      },
    },
  }
  elementsOptions: StripeElementsOptions = {
    locale: 'xof',
  };

  stripeTest!: FormGroup;

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
      sexe: new FormControl('h', Validators.required),
      duree: new FormControl('1')
    },
    {
      validators: [Validation.match('password', 'confirmPassword')]
    }
  )

  constructor(private store: Store<RegistrationState>,
              private stripeService: StripeService,
              private fb: FormBuilder,
              private httpClient: HttpClient,
              private toastr: ToastrService,
              private router: Router) {

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

  get duree() {
    return this.subscribeForm.get('duree')
  }

  changePrice(evt: any) {
    if (evt.target.id === '1') {
      this.stripeTest.controls['amount'].setValue(15000);
    } else {
      this.stripeTest.controls['amount'].setValue(12000);
    }
  }

  updateEmail(evt: any) {
    this.stripeTest.controls['name'].setValue(evt.target.value);
  }


  ngOnInit(): void {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]],
      amount: [12000, [Validators.required, Validators.pattern(/\d+/)]],
    });
  }

  pay(): void {
    if (this.stripeTest.valid) {
      this.createPaymentIntent(this.stripeTest.get('amount')?.value).pipe(
        switchMap((pi) =>
          // @ts-ignore
          this.stripeService.confirmCardPayment(pi.client_secret, {
            payment_method: {
              card: this.card.element,
              billing_details: {
                name: this.stripeTest.get('name')?.value,
              }
            }
          })
        )
      )
        .subscribe((result) => {
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            Swal.close();
            this.toastr.error(result.error.message, 'Echec du paiement !');
          } else {
            // The payment has been processed!
            if (result.paymentIntent?.status === 'succeeded') {
              // Show a success message to your customer
              this.finishedRegistration(result.paymentIntent, this.subscribeForm.value);
            }
          }
        }, error => {
          Swal.close();
          this.toastr.error('Veuillez réessayer !!.', 'Echec du paiement !');
        })
    } else {
      // console.log(this.stripeTest);
    }
  }

  createPaymentIntent(amount: number) {
    return this.httpClient.post<PaymentIntent>(`${environment.apiUrl}/abonnes/payment`, {amount});
  }


  proccedPayment() {
    this.proccedPaymentStatus = true
  }

  successRegistration(){
    Swal.close();
    Swal.fire({
      title: 'Félicitation !',
      html: 'Bienvenue sur BHM ! Vous pouvez dès maintenant commencer votre programme.',
      confirmButtonText: 'Se connecter',
      icon:'success',
      allowOutsideClick: false,
      confirmButtonColor: '#EF9A38'
    }).then((result) => {
      if(result.isConfirmed){
        this.router.navigate(['/login']);
      }
    })
  }

  errorRegistration(){
    Swal.close();
    this.toastr.error('Une erreur est survenue, veuillez réessayer svp !', 'Echec de l\'inscription');
  }

  inProgressRegistration(){
    Swal.fire({
      title: 'Nous finalisons votre inscription !',
      icon: 'info',
      allowOutsideClick: false,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
        this.pay();

      }
    })
  }

  finishedRegistration(paymentIntent: any, formValue: any){
    Swal.fire({
      title: 'Paiement effectué !.',
      text: 'Veuillez patientez pendant que nous finalisons votre inscription !',
      icon: 'info',
      allowOutsideClick: false,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: async () => {
        Swal.showLoading();
        const requestValue = this.refactorFormValue(formValue, paymentIntent);
        this.sendRegistrationRequest(requestValue);
        // this.store.dispatch(getRecommandation({demande: this.recommandationForm.value}));
      }
    });
  }

  refactorFormValue(formValue: any, paymentIntent:any){
    // On récupère le poids, la taille et le programme && les infos du payment
    this.store.select(getRecommandationSelector).subscribe((data) => {
      formValue = {
        ...formValue,
        poids: data?.poids,
        taille: data?.taille,
        programme:  data?.progRecommanded ,
        descriptionPayment: paymentIntent.id,
        montantPayment: paymentIntent.amount,
      }
    });
    return formValue;
  }

  sendRegistrationRequest(requestValue: any){
    this.httpClient.post(`${environment.apiUrl}/abonnes`, requestValue).subscribe(result => {
      if(result === 'success'){
        this.successRegistration()
      }
    }, error => {
      this.errorRegistration();
      console.log(error);
    })
  }
}
