import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Store} from "@ngrx/store";
import {RegistrationState} from "../../store/registration.state";
import {getRecommandationSelector} from "../../state/recommandation.selector";
import {RecommandationState} from "../../state/recommandation.state";
import {ResultRecommandation} from "../../models/recommandation.model";
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {updateRecommandation} from "../../state/recommandation.action";

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.scss']
})
export class ResultatComponent implements OnInit {
  @Output() loadSubscribeComponent = new EventEmitter<string>();

  result: ResultRecommandation | null | undefined;

  constructor(private store: Store<RegistrationState>,
              private router: Router) {}

  ngOnInit(): void {
      this.store.select(getRecommandationSelector).subscribe((data) => {
       this.result = data;
     })
  }



  onClickNext(){
    if(!this.recommandationStatut){
      Swal.fire({
        title: 'Voulez-vous poursuivre avec notre recommandation ?',
        text: 'Le programme ' + this.result?.progRecommanded + ' est mieux adapté pour vous !',
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: '#EF9A38',
        confirmButtonText: 'Oui, je poursuis',
        cancelButtonText: 'Non, je ne veux'
      }).then((result) => {
        if(result.isConfirmed){
          this.router.navigate(['registration/subscribe']);
        }
      })
    }else{
      this.router.navigate(['registration/subscribe']);
    }
  }

    get recommandationStatut() { return this.result?.recommanded }
}
