import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Orcamentos } from './orcamentos';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Component } from '@angular/core';

const routes: Routes = [{ path: '', component: Orcamentos }];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, MatCardModule],
  exports: [RouterModule]
})
export class OrcamentosRoutingModule { }
