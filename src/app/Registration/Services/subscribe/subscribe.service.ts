import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {SubscribeModel} from "../../models/subscribe.model";
import {Observable} from "rxjs";

const SUBSCRIBE_URL = environment.apiUrl + '/abonnes';


@Injectable({
  providedIn: 'root'
})

export class SubscribeService {

  constructor(private httpClient: HttpClient) { }

  toSubscribe(subscribe: SubscribeModel): Observable<any>{
    return this.httpClient.post(SUBSCRIBE_URL, subscribe)
  }
}
