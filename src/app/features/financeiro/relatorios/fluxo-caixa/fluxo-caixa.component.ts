import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ChartComponent } from 'ng-apexcharts';
import { FinanceiroService } from '../../financeiro.service';
import { Lancamento } from '../../lancamentos/model/lancamento.model';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-fluxo-caixa',
  imports: [ChartComponent],
  templateUrl: './fluxo-caixa.html',
  styleUrl: './fluxo-caixa.scss'
})
export class FluxoCaixaComponent implements OnInit {
  public chartOptions: Partial<ChartOptions>;

  constructor(private financeiroService: FinanceiroService) {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        height: 350
      },
      xaxis: {
        categories: []
      },
      title: {
        text: 'Fluxo de Caixa por Mês'
      }
    };
  }

  ngOnInit(): void {
    this.financeiroService.getLancamentos().subscribe((dados: Lancamento[]) => {
      const agrupado: Record<string, { receita: number; despesa: number }> = {};

      dados.forEach(l => {
        const mes = new Date(l.data).toLocaleString('default', { month: 'short', year: 'numeric' });
        if (!agrupado[mes]) agrupado[mes] = { receita: 0, despesa: 0 };
        if (l.tipo === 'receita') agrupado[mes].receita += l.valor;
        else agrupado[mes].despesa += l.valor;
      });

      const categorias = Object.keys(agrupado);
      const receitas = categorias.map(mes => agrupado[mes].receita);
      const despesas = categorias.map(mes => agrupado[mes].despesa);

      this.chartOptions = {
        ...this.chartOptions,
        series: [
          { name: 'Receitas', data: receitas },
          { name: 'Despesas', data: despesas }
        ],
        xaxis: { categories: categorias }
      };
    });
  }
}

