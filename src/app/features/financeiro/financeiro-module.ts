import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceiroRoutingModule } from './financeiro-routing-module';
import { Financeiro } from './financeiro';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    Financeiro
  ],
  imports: [
    CommonModule,
    FinanceiroRoutingModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    FormsModule
  ]
})
export class FinanceiroModule { }
