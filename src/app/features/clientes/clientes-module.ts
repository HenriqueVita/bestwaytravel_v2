import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing-module';
import { ClienteComponent } from './clientes.component.';


@NgModule({
  declarations: [
    
  ],
  imports: [
    ClienteComponent,
    CommonModule,
    ClientesRoutingModule
  ]
})
export class ClientesModule { }
