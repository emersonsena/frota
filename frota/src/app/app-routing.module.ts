import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LinhasLotacaoComponent} from './containers/linhas-lotacao/linhas-lotacao.component';
import {LinhasOnibusComponent} from './containers/linhas-onibus/linhas-onibus.component';
import {ItinerarioComponent} from './containers/itinerario/itinerario.component';


const routes: Routes = [
  {path: 'linhas-lotacao', component: LinhasLotacaoComponent },
  {path: 'linhas-onibus',  component: LinhasOnibusComponent},
  {path: 'itinerario/:id',  component: ItinerarioComponent},
  {path: '', redirectTo: '/', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
