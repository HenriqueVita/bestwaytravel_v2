// src/app/orcamentos/orcamentos-list.component.ts
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OrcamentosService } from '../orcamentos.service';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MaterialModule } from "src/app/material.module";
import { Orcamento } from '../../model/orcamento.model';
import { CadastroLancamentoComponent } from '../../financeiro/lancamentos/cadastro-lancamento/cadastro-lancamento.component';
import { OrcamentoFormComponent } from '../orcamento-form/orcamento-form.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-orcamentos-list',
  standalone: true,
  imports: [RouterModule, MatTableModule, MatButtonModule, MatIconModule, CommonModule, MaterialModule],
  templateUrl: './orcamento-list.component.html',
  styleUrls: ['./orcamento-list.component.scss'],

})
export class OrcamentosListComponent implements OnInit {
  private svc = inject(OrcamentosService);  
  dataSource!: MatTableDataSource<Orcamento>;
  cols = ['dataOrcamento','cliente','produto','valorTotal','valorComissao','status','acoes'];
  dialog: any;
  loading: boolean = false;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  snack: any;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Orcamento>([]);
    this.carregarOrcamentos();
  }

  abrirFormulario(orcamento?: Orcamento): void {
    const dialogRef = this.dialog.open(OrcamentoFormComponent, {
      width: '600px',
      data: orcamento
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.carregarOrcamentos();
      }
    });
  }

  carregarOrcamentos(): void {
    this.svc.listar().subscribe({
      next: (data) => {
        this.loadDataSource(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar orçamentos', err);
      }
    });
  }

  loadDataSource(data: Orcamento[]): void {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deletar(id?: number) {
    if (!id) return;
    if (!confirm('Confirma exclusão?')) return;
    this.svc.deletar(id).subscribe({
      next: () => { alert('Deletado'); this.carregarOrcamentos(); },
      error: () => alert('Erro ao deletar')
    });
  }

  confirmarVenda(id: number) {
    if (confirm('Deseja realmente transformar este orçamento em venda?')) {
      this.svc.confirmarVenda(id).subscribe({
        next: () => {
          this.snack.open('Orçamento convertido em venda!', 'Fechar', { duration: 3000 });
          this.carregarOrcamentos();
        },
        error: (err) => {
          this.snack.open(`Erro: ${err.error?.error || 'Falha ao converter'}`, 'Fechar', { duration: 3000 });
        }
      });
    }
  }
}
