import { Component, OnInit } from '@angular/core';
import { FinanceiroService } from '../../financeiro.service';
import { Caixa } from '../../../model/caixa.model';
import { CurrencyBrPipe } from 'src/app/pipes/currency-br.pipe';
import { DatePipe } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-fechamento-caixa',
  templateUrl: './fechamento-caixa.component.html',
  imports: [SharedModule, CurrencyBrPipe, DatePipe]
})
export class FechamentoCaixaComponent implements OnInit {
  caixaAberto?: Caixa;

  constructor(private financeiroService: FinanceiroService) {}

  ngOnInit(): void {
    this.financeiroService.listarCaixaAberto().subscribe((dados) => {
      this.caixaAberto = dados!;
    });
  }

  fechar() {
    if (!this.caixaAberto) return;

    const saldoFinal = prompt('Informe o saldo final do caixa:');
    if (saldoFinal === null) return;

    this.financeiroService.fecharCaixa(this.caixaAberto.id!, {
      dataFechamento: new Date().toISOString(),
      saldoFinal: parseFloat(saldoFinal),
      status: 'fechado'
    }).subscribe(() => {
      alert('Caixa fechado com sucesso!');
      this.caixaAberto = undefined;
    });
  }
}
