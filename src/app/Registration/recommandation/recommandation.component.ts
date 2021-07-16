import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import Swal from 'sweetalert2';
import {Store} from "@ngrx/store";
import {RegistrationState} from "../store/registration.state";
import {getRecommandation} from "../state/recommandation.action";
import {validationNumField} from "../../shared/validations/numeric.directive";



@Component({
  selector: 'app-recommandation',
  templateUrl: './recommandation.component.html',
  styleUrls: ['./recommandation.component.scss']
})
export class RecommandationComponent implements OnInit {

  // Output
  @Output() loadResultComponent = new EventEmitter<string>();


  // Variables
  resultRecomandation = [];
  hasResult: boolean = false;
  choice = '';



  // On crée le formulaire de la recommandation
  recommandationForm = new FormGroup({
    poids: new FormControl('', [Validators.required]),
    taille: new FormControl('', [Validators.required]),
    choix: new FormControl('prise_de_masse')
  })

  constructor(private httpClient: HttpClient,
              private store: Store<RegistrationState>) {
    this.hasResult = false;
  }

  ngOnInit(): void {
  }


  onSubmit() {
    Swal.fire({
      title: 'Veuillez patientez svp...',
      text: 'Nous vérifions si ce programme est adapté pour vous !',
      icon: 'info',
      allowOutsideClick: false,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
        this.loadResultComponent.emit('resultat');
        this.store.dispatch(getRecommandation({demande: this.recommandationForm.value}));
        }
    });
  }


  get poids() { return this.recommandationForm.get('poids') }


}
