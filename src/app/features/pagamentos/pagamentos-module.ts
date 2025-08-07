import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagamentosRoutingModule } from './pagamentos-routing-module';
import { Pagamentos } from './pagamentos';


@NgModule({
  declarations: [
    Pagamentos
  ],
  imports: [
    CommonModule,
    PagamentosRoutingModule
  ]
})
export class PagamentosModule { }
