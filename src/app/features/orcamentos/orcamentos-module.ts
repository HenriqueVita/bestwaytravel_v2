import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrcamentosRoutingModule } from './orcamentos-routing-module';
import { Orcamentos } from './orcamentos';
import { SharedModule } from "src/app/theme/shared/shared.module";


@NgModule({
  declarations: [
    Orcamentos
  ],
  imports: [
    CommonModule,
    OrcamentosRoutingModule,
    SharedModule
]
})
export class OrcamentosModule { }
