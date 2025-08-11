// vendas-list.component.ts
import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VendasService } from './vendass.service';
import { MaterialModule } from 'src/app/material.module';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { CurrencyBrPipe } from 'src/app/pipes/currency-br.pipe';

@Component({
  selector: 'app-vendas-list',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.scss'],
  imports: [MaterialModule, MatTableModule, CurrencyBrPipe],
})
export class VendasListComponent {
  private vendasService = inject(VendasService);
  private snack = inject(MatSnackBar);
  displayedColumns: string[] = ['dataVenda', 'cliente', 'produto', 'valorTotal', 'acoes'];
  dataSource: any;
  vendas: any[] = [];

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.vendasService.listar().subscribe({
      next: (data) => (this.vendas = data),
      error: () => this.snack.open('Erro ao carregar vendas', 'Fechar', { duration: 3000 })
    });
  }
}
