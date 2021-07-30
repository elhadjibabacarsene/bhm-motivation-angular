import {Injectable} from '@angular/core';
import {ActivatedRoute, CanLoad, Route, Router, UrlSegment, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
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
    const feature = route.data?.feature;
    console.log(feature, 'feature name');
    if (feature) {
      const isEnabled = this.featureFlagsService.isFeatureEnabled(feature);
      if (isEnabled) {
        return true;
      }
    }
    this.router.navigate(['login']).then(() => alert('La fonctionnalité ' + feature + ' est temporairement indisponible !'));
    return false;
  }
}
