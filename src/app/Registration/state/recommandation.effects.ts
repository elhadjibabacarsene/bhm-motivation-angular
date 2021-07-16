import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {getRecommandation, getRecommandationSuccess} from "./recommandation.action";
import {exhaustMap, map, mergeMap, tap} from "rxjs/operators";
import {RegistrationService} from "../Services/registration.service.service";
import Swal from "sweetalert2";
import {Router} from "@angular/router";


@Injectable()
export class RecommandationEffects {
  recommandation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getRecommandation),
      mergeMap((action) => {
        return this.registrationService.getRecommandation(action.demande)
          .pipe(map(data => {
            Swal.close();
            return getRecommandationSuccess({recommandation: data});
          }))
      }))
  })
  rsltRecommandationRedirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getRecommandationSuccess),
      tap((action) => {
        this.router.navigate(['registration/result-recommandation']);
      })
    )
  }, {dispatch: false})

  constructor(private actions$: Actions,
              private registrationService: RegistrationService,
              private router: Router) {
  }
}
