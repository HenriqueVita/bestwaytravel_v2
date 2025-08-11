import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceiroRoutingModule } from './financeiro-routing-module';
import { Financeiro } from './financeiro';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FinanceiroService } from './financeiro.service';
import { FaturaService } from '../faturas/fatura.service';
import { CadastroLancamentoComponent } from './lancamentos/cadastro-lancamento/cadastro-lancamento.component';
import { ListaLancamentosComponent } from './lancamentos/lista-lancamentos/lista-lancamentos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CurrencyBrPipe } from 'src/app/pipes/currency-br.pipe';


@NgModule({
  declarations: [
    Financeiro
  ],
  imports: [
    CurrencyBrPipe, 
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule,
    // Angular Material
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatTabsModule,
    MatCheckboxModule,
    CommonModule,
    MatTableModule,
    FinanceiroRoutingModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    FormsModule
  ],
  providers: [
    FinanceiroService,
  ]
})
export class FinanceiroModule { }
