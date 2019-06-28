import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './containers/home/home.component';
import {LinhasOnibusComponent} from './containers/linhas-onibus/linhas-onibus.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {path: 'linhas-onibus',  component: LinhasOnibusComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
