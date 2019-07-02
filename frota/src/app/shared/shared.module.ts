import {ErrorHandler, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material.module';
// import {MessageComponent} from './message/message.component';
// import {MessageService} from '../core/services/message.service';

// import {AppErrorhandle} from '../core/interceptors/app-errorhandle';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {PageTitleComponent} from './page-title/page-title.component';
import {RouterModule} from '@angular/router';
//import {ProgressBarComponent} from './progress-bar/progress-bar.component';
// import {ProgressBarService} from '../core/services/progress.bar.service';
// import {SlideshowModule} from 'ng-simple-slideshow';
// import {CurrencyMaskModule} from 'ng2-currency-mask';

@NgModule({
  declarations: [
    //MessageComponent,
     PageTitleComponent,
 //ProgressBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    // SlideshowModule,

  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  //  MessageComponent,
    PageTitleComponent,
  //  ProgressBarComponent,
    RouterModule,
    // SlideshowModule,

  ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
      //  MessageService,
      //  ProgressBarService,
      //  {
      //    provide: CURRENCY_MASK_CONFIG,
      //    useValue: CustomCurrencyMaskConf
    //    },
        // {
        //   provide: ErrorHandler,
        //   useClass: AppErrorhandle
        // },
        // {
        //   provide: HTTP_INTERCEPTORS,
        //   useClass: AuthInterceptor,
        //   multi: true
        // }
      ]
    };
  }

}
