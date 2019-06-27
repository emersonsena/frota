import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from '../../core/services/message.service';
import {MatSnackBar} from '@angular/material';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit, OnDestroy {

  message: string;
   private subscription: Subscription;

  constructor(private messageService: MessageService,
              private snackBar: MatSnackBar,
              private zone: NgZone) {
  }

  ngOnInit() {
    if (this.messageService.getMessage() !== undefined) {
     this.subscription = this.messageService.getMessage().subscribe(
        message => {
          this.showMessage(message);
          this.message = '';
        }
      );
    }
  }

  private showMessage(message: string) {
    this.message = message;
    this.zone.run(() => {
      this.snackBar.open(message, 'Fechar', {duration: 3000});
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
