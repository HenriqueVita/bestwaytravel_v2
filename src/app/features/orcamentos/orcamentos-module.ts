import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrcamentosRoutingModule } from './orcamentos-routing-module';
import { Orcamentos } from './orcamentos';
import { MatCardModule } from "@angular/material/card";


@NgModule({
  declarations: [
    Orcamentos
  ],
  imports: [
    CommonModule,
    OrcamentosRoutingModule,
    MatCardModule
]
})
export class OrcamentosModule { }
