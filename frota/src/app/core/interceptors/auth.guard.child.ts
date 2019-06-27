import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserLoggedService} from '../services/user.logged.service';
import {LoginService} from '../services/login.service';

@Injectable()
export class AuthGuardChild implements CanActivateChild {

  public user: UserLoggedService;

  constructor(private route: Router, private loginService: LoginService) {
    this.user = UserLoggedService.getInstance();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url = state.url;
    if (!this.user.isValid()) {
      this.loginService.logout();
      return false;
    }

    if (!this.user.hasPermissionTo(url)) {
      this.route.navigate(['/']);
      return false;
    }
    return true;
  }
}
