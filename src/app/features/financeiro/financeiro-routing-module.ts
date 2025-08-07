import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard';
import { CadastroLancamentoComponent } from './lancamentos/cadastro-lancamento/cadastro-lancamento';
import { ListaLancamentosComponent } from './lancamentos/lista-lancamentos/lista-lancamentos';
import { FluxoCaixaComponent } from './relatorios/fluxo-caixa/fluxo-caixa.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'lancamentos', component: ListaLancamentosComponent },
  { path: 'lancamentos/novo', component: CadastroLancamentoComponent },
  { path: 'relatorios/fluxo-caixa', component: FluxoCaixaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceiroRoutingModule { }
