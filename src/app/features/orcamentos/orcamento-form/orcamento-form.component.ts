// src/app/orcamentos/orcamento-form.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { startWith } from 'rxjs/operators';
import { FormaPagamento } from '../../model/forma-pagamento.model';
import { Orcamento } from '../../model/orcamento.model';
import { ProdutoTipo } from '../../model/produto.model';
import { OrcamentosService } from '../orcamentos.service';

@Component({
  selector: 'app-orcamento-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './orcamento-form.component.html',
  styleUrls: ['./orcamento-form.component.scss']
})
export class OrcamentoFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private svc = inject(OrcamentosService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  produtos: ProdutoTipo[] = ['Hotel','Aéreo','Pacote','Passeio','Seguro','Outro'];
  form = this.fb.group({
    nome_cliente: ['', Validators.required],
    fornecedor: [''],
    loc_reserva: [''],
    data_orcamento: [new Date(), Validators.required],
    data_viagem: [null],
    produto: [this.produtos[0], Validators.required],
    valor: [0, [Validators.required, Validators.min(0)]],
    taxa: [0],
    percentual_comissao: [0, [Validators.min(0)]],
    incentivo: [0],
    desconto: [0],
    forma_pagamento: ['cartao', Validators.required],
    data_pagamento: [null],
    data_recebimento_comissao: [null],
    observacoes: ['']
  });

  valorTotal = 0;
  valorComissao = 0;

  ngOnInit(): void {
    // recalc quando campos mudarem
    this.form.valueChanges.pipe(startWith(this.form.value)).subscribe(() => this.recalcular());

    // comportamento condicional de validação
    this.form.get('forma_pagamento')!.valueChanges.subscribe(
      (v: any) => {
      if (v === 'faturado') {
        this.form.get('data_pagamento')!.setValidators([Validators.required]);
        this.form.get('data_recebimento_comissao')!.clearValidators();
      } else {
        this.form.get('data_recebimento_comissao')!.setValidators([Validators.required]);
        this.form.get('data_pagamento')?.clearValidators(); // safe
        this.form.get('data_pagamento')!.clearValidators();
      }
      this.form.get('data_pagamento')!.updateValueAndValidity();
      this.form.get('data_recebimento_comissao')!.updateValueAndValidity();
    });

    // se rota tem id -> editar (opcional)
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.svc.obter(+id).subscribe(o => this.populate(o));
    }
  }

  get isFaturado() { return this.form.get('forma_pagamento')!.value === 'faturado'; }
  get isCartao() { return this.form.get('forma_pagamento')!.value === 'cartao'; }

  recalcDebounce: any;
  recalculate() { this.recalcular(); } // exposed if needed

  private recalcular() {
    clearTimeout(this.recalcDebounce);
    this.recalcDebounce = setTimeout(() => {
      const v = Number(this.form.get('valor')!.value || 0);
      const t = Number(this.form.get('taxa')!.value || 0);
      const perc = Number(this.form.get('percentual_comissao')!.value || 0);
      const incentivo = Number(this.form.get('incentivo')!.value || 0);
      const desconto = Number(this.form.get('desconto')!.value || 0);

      this.valorTotal = Number((v + t).toFixed(2));
      this.valorComissao = Number(((perc / 100) * v + incentivo - desconto).toFixed(2));
    }, 80);
  }

  salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.value;
    const payload: Orcamento = {
      nome_cliente: raw.nome_cliente!,
      fornecedor: raw.fornecedor!,
      loc_reserva: raw.loc_reserva!,
      data_orcamento: new Date(raw.data_orcamento!).toISOString(),
      data_viagem: raw.data_viagem ? new Date(raw.data_viagem).toISOString() : undefined,
      produto: raw.produto!,
      valor: Number(raw.valor),
      taxa: Number(raw.taxa || 0),
      valor_total: this.valorTotal,
      percentual_comissao: Number(raw.percentual_comissao || 0),
      incentivo: Number(raw.incentivo || 0),
      desconto: Number(raw.desconto || 0),
      valor_comissao: this.valorComissao,
      forma_pagamento: raw.forma_pagamento! as FormaPagamento,
      data_pagamento: raw.data_pagamento ? new Date(raw.data_pagamento).toISOString() : undefined,
      data_recebimento_comissao: raw.data_recebimento_comissao ? new Date(raw.data_recebimento_comissao).toISOString() : undefined,
      observacoes: raw.observacoes!,
      criado_em: new Date().toISOString()
    };

    const id = this.route.snapshot.params['id'];
    const sub = id ? this.svc.atualizar(+id, payload) : this.svc.criar(payload);
    sub.subscribe({
      next: () => { alert('Orçamento salvo'); this.router.navigate(['/financeiro/orcamentos']); },
      error: (e) => { console.error(e); alert('Erro ao salvar'); }
    });
  }

  cancelar() { this.router.navigate(['/financeiro/orcamentos']); }

  private populate(o: Orcamento) {
    // preencher form com o objeto vindo do backend
    this.form.patchValue({
      nome_cliente: o.nome_cliente!,
      fornecedor: o.fornecedor,
      loc_reserva: o.loc_reserva,
      data_orcamento: o.data_orcamento ? new Date(o.data_orcamento) : null,
      data_viagem: null,
      produto: o.produto,
      valor: o.valor,
      taxa: o.taxa,
      percentual_comissao: o.percentual_comissao,
      incentivo: o.incentivo,
      desconto: o.desconto,
      forma_pagamento: o.forma_pagamento,
      data_pagamento: null,
      data_recebimento_comissao: null,
      observacoes: o.observacoes
    });
    this.recalcular();
  }
}
