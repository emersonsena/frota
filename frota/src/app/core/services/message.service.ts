import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class MessageService {

  private event = new EventEmitter<string>();

  constructor() {
  }

  showMessage(message: string): void {
    this.event.emit(message);
  }

  getMessage(): EventEmitter<string> {
    return this.event;
  }

}
