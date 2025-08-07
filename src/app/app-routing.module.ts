// Angular Import
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./features/dashboard/dashboard-module').then((c) => c.DashboardModule)
      },
      {
        path: 'orcamentos',
        loadChildren: () => import('./features/orcamentos/orcamentos-module').then((m) => m.OrcamentosModule)
      },
      {
        path: 'chart',
        loadComponent: () => import('./demo/chart-maps/core-apex.component').then((c) => c.CoreApexComponent)
      },
      {
        path: 'forms',
        loadComponent: () => import('./demo/forms/form-elements/form-elements.component').then((c) => c.FormElementsComponent)
      },
      {
        path: 'tables',
        loadComponent: () => import('./demo/tables/tbl-bootstrap/tbl-bootstrap.component').then((c) => c.TblBootstrapComponent)
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component').then((c) => c.SamplePageComponent)
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./demo/pages/authentication/sign-up/sign-up.component').then((c) => c.SignUpComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./demo/pages/authentication/sign-in/sign-in.component').then((c) => c.SignInComponent)
      }
    ]
  },
  { path: 'vendas', loadChildren: () => import('./features/vendas/vendas-module').then(m => m.VendasModule) },
  { path: 'financeiro', loadChildren: () => import('./features/financeiro/financeiro-module').then(m => m.FinanceiroModule) },
  { path: 'clientes', loadChildren: () => import('./features/clientes/clientes-module').then(m => m.ClientesModule) },
  { path: 'faturas', loadChildren: () => import('./features/faturas/faturas-module').then(m => m.FaturasModule) },
  { path: 'pagamentos', loadChildren: () => import('./features/pagamentos/pagamentos-module').then(m => m.PagamentosModule) },
  { path: 'usuarios', loadChildren: () => import('./features/usuarios/usuarios-module').then(m => m.UsuariosModule) },
  { path: 'destinos', loadChildren: () => import('./features/destinos/destinos-module').then(m => m.DestinosModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
