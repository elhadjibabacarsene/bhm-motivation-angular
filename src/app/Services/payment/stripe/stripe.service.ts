import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PaymentIntent} from "@stripe/stripe-js";
import {environment} from "../../../../environments/environment";
import {switchMap} from "rxjs/operators";
import {StripeCardComponent, StripeService} from "ngx-stripe";
import Swal from "sweetalert2";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class StripePaymentService {

  constructor(private httpClient: HttpClient,
              private stripeService: StripeService,
              private toastr: ToastrService) { }

  createPaymentIntent(amount: number){
    return this.httpClient.post<PaymentIntent>(`${environment.apiUrl}/abonnes/payment`, {amount});
  }

  payWithStripe(amount: number, card: StripeCardComponent, name: string){
    this.createPaymentIntent(amount).pipe(
      switchMap((pi) =>
        // @ts-ignore
        this.stripeService.confirmCardPayment(pi.client_secret, {
          payment_method: {
            card: card.element,
            billing_details: {
              name: name
            }
          }
        }).subscribe((result) => {
          // On ferme le modal ouvert
          Swal.close();
          if(result.error){
            // On affiche l'erreur sur une alert
            this.toastr.error(result.error.message, 'Echec du paiement !');
          }else{
            if(result.paymentIntent?.status === 'succeeded'){
              return result.paymentIntent
            }
          }
          return;
        })
      )
    )
  }
}
