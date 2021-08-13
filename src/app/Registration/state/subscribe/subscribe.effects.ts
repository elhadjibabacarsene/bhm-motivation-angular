import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {toSubscribe} from "./subscribe.action";
import {map, mergeMap} from "rxjs/operators";
import {SubscribeService} from "../../Services/subscribe/subscribe.service";



@Injectable()
export class SubscribeEffects{

  constructor(private action$: Actions,
              private subscribeService: SubscribeService) {
  }

  toSubscribe$ = createEffect(() => {
    return this.action$.pipe(
      ofType(toSubscribe),
      mergeMap((action) => {
        return this.subscribeService.toSubscribe(action.subscribe)
          .pipe(map(data => {
            if(data.success){

            }
          }))
      })
    )
  })
}
