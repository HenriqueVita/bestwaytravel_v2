import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FinanceiroService } from '../../financeiro.service';
import { CurrencyBrPipe } from 'src/app/pipes/currency-br.pipe';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-movimentos-caixa',
  imports: [DatePipe, CurrencyBrPipe, SharedModule],
  templateUrl: './movimentos-caixa.html',
  styleUrl: './movimentos-caixa.scss'
})
export class MovimentosCaixa {
fluxoCaixa: any[] = [];
  saldoAtual = 0;
  loading = false;
  filtroForm: FormGroup;

  constructor(
    private financeiroService: FinanceiroService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.filtroForm = this.fb.group({
      dataInicio: [this.getFirstDayOfMonth()],
      dataFim: [new Date()],
      agruparPor: ['dia']
    });
  }

  ngOnInit(): void {
    this.carregarFluxoCaixa();
  }

  getFirstDayOfMonth(): Date {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }

  carregarFluxoCaixa(): void {
    this.loading = true;
    const params = {
      dataInicio: this.datePipe.transform(this.filtroForm.value.dataInicio, 'yyyy-MM-dd'),
      dataFim: this.datePipe.transform(this.filtroForm.value.dataFim, 'yyyy-MM-dd'),
      agruparPor: this.filtroForm.value.agruparPor
    };

    this.financeiroService.getFluxoCaixa(params).subscribe({
      next: (data: any) => {
        this.fluxoCaixa = data.itens;
        this.saldoAtual = data.saldoAtual;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  calcularSaldoAcumulado(index: number): number {
    return this.fluxoCaixa.slice(0, index + 1).reduce((acc, item) => acc + item.saldoDia, 0);
  }
}
