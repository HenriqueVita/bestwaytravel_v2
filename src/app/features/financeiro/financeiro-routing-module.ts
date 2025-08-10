import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard').then((c) => c.Dashboard)  },
  { path: 'lancamentos', loadComponent: () => import('./lancamentos/lista-lancamentos/lista-lancamentos.component').then((c) => c.ListaLancamentosComponent) },
  { path: 'lancamentos/novo', loadComponent: () => import('./lancamentos/cadastro-lancamento/cadastro-lancamento.component').then((c) => c.CadastroLancamentoComponent) },
  { path: 'relatorios/fluxo-caixa', loadComponent: () => import('./relatorios/fluxo-caixa/fluxo-caixa.component').then((c) => c.FluxoCaixaComponent) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceiroRoutingModule { }
