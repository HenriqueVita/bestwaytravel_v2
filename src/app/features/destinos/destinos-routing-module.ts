import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Destinos } from './destinos';

const routes: Routes = [{ path: '', component: Destinos }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DestinosRoutingModule { }
