// src/app.routes.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard';
import { AberturaCaixaComponent } from './features/financeiro/caixa/abertura-caixa/abertura-caixa.component';
import { FechamentoCaixaComponent } from './features/financeiro/caixa/fechamento-caixa/fechamento-caixa.component';
import { CadastroLancamentoComponent } from './features/financeiro/lancamentos/cadastro-lancamento/cadastro-lancamento.component';
import { ListaLancamentosComponent } from './features/financeiro/lancamentos/lista-lancamentos/lista-lancamentos.component';
import { FluxoCaixaComponent } from './features/financeiro/relatorios/fluxo-caixa/fluxo-caixa.component';
import { AdminComponent } from './theme/layout/admin/admin.component';

export const routes: Routes = [
  {path: '',
      component: AdminComponent,
      children: [
        { path: '', redirectTo: '/home', pathMatch: 'full' },
        { path: 'home', loadChildren: () => import('./features/dashboard/dashboard-module').then((c) => c.DashboardModule) },
        { path: 'orcamentos', loadChildren: () => import('./features/orcamentos/orcamentos-module').then((m) => m.OrcamentosModule) },
        { path: 'vendas', loadChildren: () => import('./features/vendas/vendas-module').then(m => m.VendasModule) },
        { path: 'financeiro', loadChildren: () => import('./features/financeiro/financeiro-module').then(m => m.FinanceiroModule) },
        { path: 'clientes', loadChildren: () => import('./features/clientes/clientes-module').then(m => m.ClientesModule) },
        { path: 'faturas', loadChildren: () => import('./features/faturas/faturas-module').then(m => m.FaturasModule) },
        { path: 'pagamentos', loadChildren: () => import('./features/pagamentos/pagamentos-module').then(m => m.PagamentosModule) },
        { path: 'usuarios', loadChildren: () => import('./features/usuarios/usuarios-module').then(m => m.UsuariosModule) },
        { path: 'destinos', loadChildren: () => import('./features/destinos/destinos-module').then(m => m.DestinosModule) }
      ]
},
  { path: '**', redirectTo: '' }
];
