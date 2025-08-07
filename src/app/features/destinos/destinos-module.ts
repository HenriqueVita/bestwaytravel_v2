import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DestinosRoutingModule } from './destinos-routing-module';
import { Destinos } from './destinos';


@NgModule({
  declarations: [
    Destinos
  ],
  imports: [
    CommonModule,
    DestinosRoutingModule
  ]
})
export class DestinosModule { }
