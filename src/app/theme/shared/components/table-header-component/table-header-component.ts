import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from "src/app/material.module";

@Component({
  selector: 'app-table-header-component',
  templateUrl: './table-header-component.html',
  styleUrl: './table-header-component.scss',
  imports: [CommonModule, ReactiveFormsModule, MaterialModule]
})
export class TableHeaderComponent {
form: any;
globalFIlter: any;

}
