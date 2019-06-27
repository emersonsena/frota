import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class ProgressBarService {

  private event = new EventEmitter<boolean>();

  private progressBar(canLoad: boolean) {
    this.event.emit(canLoad);
  }

  show() {
    this.progressBar(true);
  }

  hide() {
    this.progressBar(false);
  }


  getEvent(): EventEmitter<boolean> {
    return this.event;
  }

}
