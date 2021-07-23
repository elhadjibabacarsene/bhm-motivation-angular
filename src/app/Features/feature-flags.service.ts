import { Injectable } from '@angular/core';
import {FeatureConfig} from "./feature.interface";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagsService {
  config!: FeatureConfig;
  configUrl = environment.apiUrl + "/features";

  constructor(private httpClient: HttpClient) { }

  loadConfig(){
    return this.httpClient.get<FeatureConfig>(this.configUrl)
      .pipe(tap(data => (this.config = data)))
      .toPromise();
  }

  isFeatureEnabled(key: string){
    if(this.config){
    }
  }
}
