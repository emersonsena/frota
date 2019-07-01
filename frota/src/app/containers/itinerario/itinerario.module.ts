import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 import {SharedModule} from '../../shared/shared.module';

import {ItinerarioComponent} from './itinerario.component';


@NgModule({
  declarations: [ItinerarioComponent],
  exports:[ItinerarioComponent],
  imports: [
    CommonModule,
    SharedModule,
  ]


})
export class ItinerarioModule { }
