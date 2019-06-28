import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {LinhasOnibusComponent} from './linhas-onibus.component';

@NgModule({
  declarations: [LinhasOnibusComponent],
  exports:[LinhasOnibusComponent],
  imports: [
    CommonModule
  ]
})
export class LinhasOnibusModule { }
