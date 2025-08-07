import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FaturasRoutingModule } from './faturas-routing-module';
import { Faturas } from './faturas';


@NgModule({
  declarations: [
    Faturas
  ],
  imports: [
    CommonModule,
    FaturasRoutingModule
  ]
})
export class FaturasModule { }
