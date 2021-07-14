import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Store} from "@ngrx/store";
import {RegistrationState} from "../../store/registration.state";
import {getRecommandationSelector} from "../../state/recommandation.selector";
import {RecommandationState} from "../../state/recommandation.state";
import {ResultRecommandation} from "../../models/recommandation.model";

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.scss']
})
export class ResultatComponent implements OnInit {
  @Output() loadSubscribeComponent = new EventEmitter<string>();

  result: ResultRecommandation | null | undefined;

  constructor(private store: Store<RegistrationState>) {}

  ngOnInit(): void {
    this.store.select(getRecommandationSelector).subscribe((data) => {
     this.result = data;
   })

  }

}
