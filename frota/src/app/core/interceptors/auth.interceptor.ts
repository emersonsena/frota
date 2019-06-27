import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {UserLoggedService} from '../services/user.logged.service';
import {ProgressBarService} from '../services/progress.bar.service';
import {tap} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  user: UserLoggedService;

  constructor(private progressBar: ProgressBarService) {
    this.user = UserLoggedService.getInstance();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.progressBar.show();
    if (this.user.isValid()) {

      const authReq = req.clone({
        setHeaders: {
          'Authorization': this.user.getUserToken()
        }
      });
      return next.handle(authReq)
        .pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              this.progressBar.hide();
            }
          },
          (err: any) => {
            this.progressBar.hide();
          }))
        ;
    } else {

      return next.handle(req)
        .pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              this.progressBar.hide();
            }
          },
          (err: any) => {
            this.progressBar.hide();
          }))
        ;
    }
  }
}
