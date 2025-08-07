import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Faturas } from './faturas';

const routes: Routes = [{ path: '', component: Faturas }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaturasRoutingModule { }
