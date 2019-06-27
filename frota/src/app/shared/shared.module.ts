import {ErrorHandler, ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material.module';
import {MessageComponent} from './message/message.component';
import {MessageService} from '../core/services/message.service';
import {LoginService} from '../core/services/login.service';
import {AppErrorhandle} from '../core/interceptors/app-errorhandle';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from '../core/interceptors/auth.interceptor';
import {AuthGuard} from '../core/interceptors/auth.guard';
import {UserLoggedService} from '../core/services/user.logged.service';
import {PageTitleComponent} from './page-title/page-title.component';
import {RouterModule} from '@angular/router';
import {AuthGuardChild} from '../core/interceptors/auth.guard.child';
import {ProgressBarComponent} from './progress-bar/progress-bar.component';
import {ProgressBarService} from '../core/services/progress.bar.service';
import {OrderService} from '../core/services/order.service';
import {ProductService} from '../core/services/product.service';
// import {SlideshowModule} from 'ng-simple-slideshow';
// import {CurrencyMaskModule} from 'ng2-currency-mask';
// import {CURRENCY_MASK_CONFIG} from 'ng2-currency-mask/src/currency-mask.config';
// import {CustomCurrencyMaskConf} from '../settings/custom.currency.mask.conf';

@NgModule({
  declarations: [MessageComponent, PageTitleComponent,
 //ProgressBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    // SlideshowModule,
    // CurrencyMaskModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MessageComponent,
    PageTitleComponent,
  //  ProgressBarComponent,
    RouterModule,
    // SlideshowModule,
    // CurrencyMaskModule,
  ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthGuard,
        AuthGuardChild,
        MessageService,
        LoginService,
        UserLoggedService,
        ProgressBarService,
        OrderService,
        ProductService,
      //  {
      //    provide: CURRENCY_MASK_CONFIG,
      //    useValue: CustomCurrencyMaskConf
    //    },
        {
          provide: ErrorHandler,
          useClass: AppErrorhandle
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
        }
      ]
    };
  }

}
