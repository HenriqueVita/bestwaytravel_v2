import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendasRoutingModule } from './vendas-routing-module';
import { Vendas } from './vendas';


@NgModule({
  declarations: [
    Vendas
  ],
  imports: [
    CommonModule,
    VendasRoutingModule
  ]
})
export class VendasModule { }
