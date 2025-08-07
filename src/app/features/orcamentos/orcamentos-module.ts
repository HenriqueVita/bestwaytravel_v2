import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrcamentosRoutingModule } from './orcamentos-routing-module';
import { OrcamentosComponent } from './orcamentos';
import { MatCardModule } from "@angular/material/card";
import { NgxMaskDirective } from 'ngx-mask';
import { TableHeaderComponent } from 'src/app/theme/shared/components/table-header-component/table-header-component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [
    OrcamentosComponent
  ],
  imports: [
    MaterialModule,
    CommonModule,
    OrcamentosRoutingModule,
    MatCardModule,
    NgxMaskDirective,
    TableHeaderComponent,    
]
})
export class OrcamentosModule { }
