import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {SessionManager} from "../shared/session-manager";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {


  constructor(private router: Router, private sessionManager: SessionManager) {}

  canActivate(route: ActivatedRouteSnapshot, state:    RouterStateSnapshot): boolean {
    if (state.url !== '/login' && !this.isAuthenticated()) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
    return true;

  }

  canActivateChild(route: ActivatedRouteSnapshot, state:  RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  isAuthenticated() {
    let jwt = this.sessionManager.checkSession();
    return jwt!=null && jwt.length > 0;

  }
}
