import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {MessageService} from '../services/message.service';
import {UserLoggedService} from '../services/user.logged.service';
import {Router} from '@angular/router';

@Injectable()
export class AppErrorhandle implements ErrorHandler {

  constructor(private messageService: MessageService,
              private injector: Injector) {
  }

  handleError(error: any): void {
    console.log(error);
    if (error.status === 0) {
      this.messageService.showMessage('Erro de comunicação! Tente novamente em alguns munutos.');
    }

    if (error.status >= 400 && error.status < 500) {
      this.messageService.showMessage(error['error']['errors'][0]);
    }
  }

  private getUser(): UserLoggedService {
    return this.injector.get(UserLoggedService);
  }

  private getRoute(): Router {
    return this.injector.get(Router);
  }
}
