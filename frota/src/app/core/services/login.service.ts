import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
// import {PESCATTU_API} from '../../settings/pescattu.api';
import {Response} from '../models/response';
import {UserLoggedService} from './user.logged.service';

@Injectable()
export class LoginService {

  userLogged: UserLoggedService;

  constructor(private http: HttpClient, private router: Router) {
    this.userLogged = UserLoggedService.getInstance();
  }

  login(login: string, senha: string): Observable<Response> {

    const user = {
      login: login,
      senha: senha,
      system: 'PESCATTU_FUNCIONARIO'
    };

    return null;
  //  this.http.post<Response>(`${PESCATTU_API}/auth`, user);

  }

  logout() {
    this.userLogged.removeAuthToken();
    this.router.navigate(['/login']);
  }

  refreshToken() {
    return null;
  //  this.http.post(`${PESCATTU_API}/auth/refresh`, {});
  }


}
