import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Lancamento } from 'src/app/features/model/lancamento.model';
import { FinanceiroService } from '../../financeiro.service';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-cadastro-lancamento',
  templateUrl: './cadastro-lancamento.component.html',
  imports: [SharedModule]
})
export class CadastroLancamentoComponent {
  lancamentoForm: FormGroup;

  categorias = ['Transporte', 'Hospedagem', 'Seguro', 'Alimentação'];

  constructor(
    private fb: FormBuilder,
    private financeiroService: FinanceiroService
  ) {
    this.lancamentoForm = this.fb.group({
      tipo: ['receita', Validators.required],
      descricao: ['', Validators.required],
      categoria: ['', Validators.required],
      valor: [0, [Validators.required, Validators.min(0.01)]],
      dataVencimento: ['', Validators.required],
      data: [new Date()], 
      status: ['pendente', Validators.required]
    });
  }

  salvar() {
    if (this.lancamentoForm.invalid) return;

    const novoLancamento: Lancamento = this.lancamentoForm.value;

    this.financeiroService.salvarLancamento(novoLancamento).subscribe({
      next: () => {
        alert('Lançamento salvo com sucesso!');
        this.lancamentoForm.reset({ tipo: 'receita', status: 'pendente' });
      },
      error: (err: any) => {
        console.error(err);
        alert('Erro ao salvar lançamento.');
      }
    });
  }
}
