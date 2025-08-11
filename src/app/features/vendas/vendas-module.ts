import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendasRoutingModule } from './vendas-routing-module';
import { VendasListComponent } from './vendas.component';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    VendasRoutingModule,
    VendasListComponent
  ]
})
export class VendasModule { }
