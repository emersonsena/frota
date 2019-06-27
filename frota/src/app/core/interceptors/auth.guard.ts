import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserLoggedService} from '../services/user.logged.service';
import {LoginService} from '../services/login.service';
//import {systemUrls} from '../../settings/pescattu.urls';

@Injectable()
export class AuthGuard implements CanActivate {

  public user: UserLoggedService;

  constructor(private route: Router, private loginService: LoginService) {
    this.user = UserLoggedService.getInstance();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.user.isValid()) {
      return true;
    }
    this.loginService.logout();
    return false;
  }
}
