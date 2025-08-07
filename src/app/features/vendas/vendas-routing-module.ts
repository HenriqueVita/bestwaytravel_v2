import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Vendas } from './vendas';

const routes: Routes = [{ path: '', component: Vendas }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendasRoutingModule { }
