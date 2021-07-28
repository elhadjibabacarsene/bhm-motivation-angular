import { Injectable } from '@angular/core';
import {ActivatedRoute, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {FeatureFlagsService} from "./feature-flags.service";

@Injectable({
  providedIn: 'root'
})
export class FeatureGuard implements CanLoad {

  private constructor(private featureFlagsService: FeatureFlagsService,
                      private router: Router,
                      private route: ActivatedRoute) {
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('hello');
    const feature = route.data?.feature;
    if(feature){
      const isEnabled = this.featureFlagsService.isFeatureEnabled(feature);
      if(isEnabled){
        return true;
      }
    }
    this.router.navigate(['login']).then(() => alert('L\'inscription est temporairement indisponible'));
    return  false;
  }
}