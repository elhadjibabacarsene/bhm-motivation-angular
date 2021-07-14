import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DemandeDeRecommandation, ResultRecommandation} from "../models/recommandation.model";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {RecommandationState} from "../state/recommandation.state";

const RECOMMANDATION_URL = environment.apiUrl + '/programmes/recommandation';

@Injectable({
  providedIn: 'root'
})



export class RegistrationService {

  constructor(private http: HttpClient) { }

  getRecommandation(recommandation: DemandeDeRecommandation): Observable<ResultRecommandation>{
      return this.http.post<ResultRecommandation>(RECOMMANDATION_URL, recommandation);
  }
}
