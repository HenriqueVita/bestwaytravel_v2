import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Fatura } from 'src/app/features/model/fatura.model';
import { FaturaService } from '../../fatura.service';
import { SharedModule } from "src/app/theme/shared/shared.module";
import { FaturaFormComponent } from '../../faturas-form/faturas-form.component';

@Component({
  selector: 'app-faturas-list',
  templateUrl: './faturas-list.component.html',
  styleUrls: ['./faturas-list.component.scss'],
  providers: [DatePipe],
  imports: [SharedModule]
})
export class FaturasListComponent implements OnInit {
  displayedColumns: string[] = ['numero', 'cliente', 'emissao', 'vencimento', 'valorTotal', 'status', 'acoes'];
  dataSource: MatTableDataSource<Fatura>;
  loading = false;
  filtroForm: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private faturaService: FaturaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.dataSource = new MatTableDataSource<Fatura>([]);
    this.filtroForm = this.fb.group({
      dataInicio: [null],
      dataFim: [null],
      status: [null],
      cliente: [null]
    });
  }

  ngOnInit(): void {
    this.carregarFaturas();
  }

  carregarFaturas(): void {
    this.loading = true;
    const params: any = {};

    if (this.filtroForm.value.dataInicio) {
      params.dataInicio = this.datePipe.transform(this.filtroForm.value.dataInicio, 'yyyy-MM-dd');
    }
    if (this.filtroForm.value.dataFim) {
      params.dataFim = this.datePipe.transform(this.filtroForm.value.dataFim, 'yyyy-MM-dd');
    }
    if (this.filtroForm.value.status) {
      params.status = this.filtroForm.value.status;
    }
    if (this.filtroForm.value.cliente) {
      params.cliente = this.filtroForm.value.cliente;
    }

    this.faturaService.getAll().subscribe({
      next: (faturas) => {
        this.dataSource = new MatTableDataSource(faturas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  abrirFormulario(fatura?: Fatura): void {
    const dialogRef = this.dialog.open(FaturaFormComponent, {
      width: '800px',
      data: fatura
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarFaturas();
      }
    });
  }

  limparFiltros(): void {
    this.filtroForm.reset();
    this.carregarFaturas();
  }

  confirmarExclusao(fatura: Fatura): void {
    if (confirm(`Deseja realmente excluir a fatura "${fatura.numero}"?`)) {
      this.faturaService.delete(fatura.id!).subscribe({
        next: () => {
          this.snackBar.open('Fatura excluída com sucesso!', 'Fechar', { duration: 3000 });
          this.carregarFaturas();
        },
        error: () => {
          this.snackBar.open('Erro ao excluir fatura.', 'Fechar', { duration: 3000 });
        }
      });
    }
  }

  marcarComoPaga(fatura: Fatura): void {
    if (confirm(`Deseja marcar a fatura "${fatura.numero}" como paga?`)) {
      this.faturaService.pagarFatura(fatura.id!, new Date()).subscribe({
        next: () => {
          this.snackBar.open('Fatura marcada como paga!', 'Fechar', { duration: 3000 });
          this.carregarFaturas();
        },
        error: () => {
          this.snackBar.open('Erro ao marcar fatura como paga.', 'Fechar', { duration: 3000 });
        }
      });
    }
  }

  cancelarFatura(fatura: Fatura): void {
    if (confirm(`Deseja realmente cancelar a fatura "${fatura.numero}"?`)) {
      this.faturaService.cancelarFatura(fatura.id!).subscribe({
        next: () => {
          this.snackBar.open('Fatura cancelada com sucesso!', 'Fechar', { duration: 3000 });
          this.carregarFaturas();
        },
        error: () => {
          this.snackBar.open('Erro ao cancelar fatura.', 'Fechar', { duration: 3000 });
        }
      });
    }
  }

  aplicarFiltro(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}