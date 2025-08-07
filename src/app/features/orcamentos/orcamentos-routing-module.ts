import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrcamentosComponent } from './orcamentos';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

const routes: Routes = [{ path: '', component: OrcamentosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, MatCardModule],
  exports: [RouterModule]
})
export class OrcamentosRoutingModule { }
