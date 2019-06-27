import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './containers/home/home.component';

import {SharedModule} from './shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {MatPaginatorIntl} from '@angular/material';
//import {MatPaginatorConf} from './settings/mat.paginator.conf';
import {registerLocaleData} from '@angular/common';
import ptBr from '@angular/common/locales/pt';

registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,

    HomeComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule.forRoot()
  ],
  providers: [
  //  {provide: MatPaginatorIntl, useClass: MatPaginatorConf},
    {provide: LOCALE_ID, useValue: 'pt-PT'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
