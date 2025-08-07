import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceiroRoutingModule } from './financeiro-routing-module';
import { Financeiro } from './financeiro';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    Financeiro
  ],
  imports: [
    CommonModule,
    MatTableModule,
    FinanceiroRoutingModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    FormsModule
  ]
})
export class FinanceiroModule { }
