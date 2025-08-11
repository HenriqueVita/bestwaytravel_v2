import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendasListComponent } from './vendas.component';

const routes: Routes = [{ path: '', component: VendasListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendasRoutingModule { }
