import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pagamentos } from './pagamentos';

const routes: Routes = [{ path: '', component: Pagamentos }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagamentosRoutingModule { }
