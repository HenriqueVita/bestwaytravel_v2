import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { LancamentoService } from '../lancamento.service';
import { Lancamento } from 'src/app/features/model/lancamento.model';
import { SharedModule } from "src/app/theme/shared/shared.module";
import { CadastroLancamentoComponent } from '../cadastro-lancamento/cadastro-lancamento.component';

@Component({
  selector: 'app-lancamentos-list',
  templateUrl: './lista-lancamentos.component.html',
  styleUrls: ['./lista-lancamentos.component.scss'],
  providers: [DatePipe],
  imports: [SharedModule]
})
export class ListaLancamentosComponent implements OnInit {
  displayedColumns: string[] = ['data', 'descricao', 'categoria', 'valor', 'tipo', 'status', 'acoes'];
  dataSource: MatTableDataSource<Lancamento>;
  loading = false;
  filtroForm: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
categorias: any;

  constructor(
    private lancamentoService: LancamentoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.dataSource = new MatTableDataSource<Lancamento>([]);
    this.filtroForm = this.fb.group({
      dataInicio: [null],
      dataFim: [null],
      tipo: [null],
      status: [null],
      categoria: [null]
    });
  }

  ngOnInit(): void {
    this.carregarLancamentos();
  }

  carregarLancamentos(): void {
    this.loading = true;
    const params: any = {};

    if (this.filtroForm.value.dataInicio) {
      params.dataInicio = this.datePipe.transform(this.filtroForm.value.dataInicio, 'yyyy-MM-dd');
    }
    if (this.filtroForm.value.dataFim) {
      params.dataFim = this.datePipe.transform(this.filtroForm.value.dataFim, 'yyyy-MM-dd');
    }
    if (this.filtroForm.value.tipo) {
      params.tipo = this.filtroForm.value.tipo;
    }
    if (this.filtroForm.value.status) {
      params.status = this.filtroForm.value.status;
    }
    if (this.filtroForm.value.categoria) {
      params.categoria = this.filtroForm.value.categoria;
    }

    this.lancamentoService.getAll().subscribe({
      next: (lancamentos) => {
        this.dataSource = new MatTableDataSource(lancamentos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  abrirFormulario(lancamento?: Lancamento): void {
    const dialogRef = this.dialog.open(CadastroLancamentoComponent, {
      width: '600px',
      data: lancamento
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarLancamentos();
      }
    });
  }

  limparFiltros(): void {
    this.filtroForm.reset();
    this.carregarLancamentos();
  }

  confirmarExclusao(lancamento: Lancamento): void {
    if (confirm(`Deseja realmente excluir o lançamento "${lancamento.descricao}"?`)) {
      this.lancamentoService.delete(lancamento.id!).subscribe({
        next: () => {
          this.snackBar.open('Lançamento excluído com sucesso!', 'Fechar', { duration: 3000 });
          this.carregarLancamentos();
        },
        error: () => {
          this.snackBar.open('Erro ao excluir lançamento.', 'Fechar', { duration: 3000 });
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