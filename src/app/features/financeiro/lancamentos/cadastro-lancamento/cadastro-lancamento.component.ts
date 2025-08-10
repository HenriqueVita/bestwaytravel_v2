import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Lancamento } from 'src/app/features/model/lancamento.model';
import { LancamentoService } from '../lancamento.service';
import { SharedModule } from "src/app/theme/shared/shared.module";

@Component({
  selector: 'cadastro-lancamento',
  templateUrl: './cadastro-lancamento.component.html',
  styleUrls: ['./cadastro-lancamento.component.scss'],
  imports: [SharedModule]
})
export class CadastroLancamentoComponent implements OnInit {
  form: FormGroup;
  loading = false;
  categorias: any[] = [];

  constructor(
    private fb: FormBuilder,
    private lancamentoService: LancamentoService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CadastroLancamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Lancamento
  ) {
    this.form = this.fb.group({
      id: [null],
      descricao: ['', Validators.required],
      valor: ['', [Validators.required, Validators.min(0.01)]],
      data: ['', Validators.required],
      tipo: ['DESPESA', Validators.required],
      categoria: ['', Validators.required],
      status: ['PENDENTE', Validators.required],
      contaBancaria: ['', Validators.required],
      observacoes: [''],
      recorrente: [false],
      periodoRecorrencia: ['']
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue(this.data);
    }
    this.carregarCategorias();
  }

  carregarCategorias(): void {
    this.lancamentoService.getCategorias().subscribe((categorias: any[]) => {
      this.categorias = categorias;
    });
  }

  salvar(): void {
    if (this.form.valid) {
      this.loading = true;
      const lancamento = this.form.value as Lancamento;

      const operacao = lancamento.id 
        ? this.lancamentoService.update(lancamento.id, lancamento)
        : this.lancamentoService.create(lancamento);

      operacao.subscribe({
        next: () => {
          this.snackBar.open('Lançamento salvo com sucesso!', 'Fechar', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: () => {
          this.snackBar.open('Erro ao salvar lançamento.', 'Fechar', { duration: 3000 });
          this.loading = false;
        }
      });
    }
  }

  onTipoChange(): void {
    // Filtra categorias pelo tipo selecionado
    this.form.get('categoria')?.setValue('');
  }

  get filteredCategorias(): any[] {
    const tipo = this.form.get('tipo')?.value;
    return this.categorias.filter(c => c.tipo === tipo);
  }
}