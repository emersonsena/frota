import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProgressBarService} from '../../core/services/progress.bar.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit, OnDestroy {

  showBar = false;
  private subscription: Subscription;

  constructor(private progressBarService: ProgressBarService) {
  }

  ngOnInit() {
    this.subscription = this.progressBarService.getEvent().subscribe(event => {
      this.showBar = event;
    });
  }

  ngOnDestroy(): void {
   this.subscription.unsubscribe();
  }

}
