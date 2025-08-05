import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrcamentosRoutingModule } from './orcamentos-routing-module';
import { Orcamentos } from './orcamentos';


@NgModule({
  declarations: [
    Orcamentos
  ],
  imports: [
    CommonModule,
    OrcamentosRoutingModule
  ]
})
export class OrcamentosModule { }
