import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LinhasLotacaoComponent} from './linhas-lotacao.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [LinhasLotacaoComponent],
  exports:[LinhasLotacaoComponent],
  imports: [
    CommonModule,
    SharedModule,
     ]
})
export class LinhasLotacaoModule { }
