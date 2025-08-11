// Angular Import
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// project import
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CardComponent } from './components/card/card.component';

// third party
import { NgScrollbarModule } from 'ngx-scrollbar';
import 'hammerjs';
import 'mousetrap';

// Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

// bootstrap import
import { NgbDropdownModule, NgbNavModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableHeaderComponent } from './components/table-header-component/table-header-component';
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";
import { OrcamentosModule } from 'src/app/features/orcamentos/orcamentos-module';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from 'src/app/material.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [  
    MatIconModule,
    OrcamentosModule,
    TableHeaderComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardComponent,
    BreadcrumbComponent,
    NgbDropdownModule,
    NgbNavModule,
    NgbModule,
    NgScrollbarModule,
    NgxMaskDirective,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    MatIconModule,
    OrcamentosModule,
    TableHeaderComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CardComponent,
    BreadcrumbComponent,
    NgbModule,
    NgbDropdownModule,
    NgbNavModule,
    NgScrollbarModule,
    TableHeaderComponent,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: []
})
export class SharedModule {}
