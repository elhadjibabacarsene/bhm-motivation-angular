import { Injectable } from '@angular/core';
import {FeatureConfig} from "./feature.interface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {tap} from "rxjs/operators";
import {has, get, some, map, isEmpty, find} from 'lodash'


const httpOptions = {
  headers: new HttpHeaders({
    'Accept':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class FeatureFlagsService {
  config: FeatureConfig[] = [];
  configUrl = environment.apiUrl + "/features";

  constructor(private httpClient: HttpClient) { }

  loadConfig(){
    return this.httpClient.get<FeatureConfig>(this.configUrl, httpOptions)
      .pipe(tap(data => this.config = this.config.concat(data)))
      .toPromise();
  }

  isFeatureEnabled(key: string): boolean{
    if(!isEmpty(this.config)){
      const feature = find(this.config, ['libelle', key])
      console.log(feature, 'feature get')
      if(feature?.statut === true){
        return true;
      }
    }
    return false;
  }
}
