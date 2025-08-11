import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

const routes: Routes = [
  { path: '', loadComponent: () => import('./orcamento-list/orcamento-list.component').then((c) => c.OrcamentosListComponent)},
  { path: 'lista', loadComponent: () => import('./orcamento-list/orcamento-list.component').then((c) => c.OrcamentosListComponent)  },
  { path: 'lista/novo', redirectTo: 'novo', pathMatch: 'full' },
  { path: 'novo', loadComponent: () => import('./orcamento-form/orcamento-form.component').then((c) => c.OrcamentoFormComponent) },
  { path: 'editar/:id', loadComponent: () => import('./orcamento-form/orcamento-form.component').then((c) => c.OrcamentoFormComponent) }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule, MatCardModule],
  exports: [RouterModule]
})
export class OrcamentosRoutingModule { }
