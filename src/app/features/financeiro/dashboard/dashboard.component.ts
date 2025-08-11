import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries,
  ApexResponsive,
  NgApexchartsModule
} from 'ng-apexcharts';
import { Caixa } from '../../model/caixa.model';
import { Lancamento } from '../../model/lancamento.model';
import { FinanceiroService } from '../financeiro.service';
import { CurrencyBrPipe } from 'src/app/pipes/currency-br.pipe';
import { SharedModule } from 'src/app/theme/shared/shared.module';

export type ChartOptionsBar = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

export type ChartOptionsPie = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [SharedModule, NgApexchartsModule, CurrencyBrPipe]
})
export class DashboardComponent implements OnInit {
  // Dados resumo
  saldoCaixa = 0;
  totalEntradasMes = 0;
  totalSaidasMes = 0;

  // Gráficos
  public chartFluxo!: Partial<ChartOptionsBar> | any;
  public chartCategorias!: Partial<ChartOptionsPie> | any;

  constructor(private financeiroService: FinanceiroService) {}

  ngOnInit(): void {
    this.carregarResumo();
    this.carregarGraficoFluxo();
    this.carregarGraficoCategorias();
  }

  carregarResumo() {
    this.financeiroService.listarCaixaAberto().subscribe((dadosCaixa: Caixa | null) => {
      if (dadosCaixa) {
        this.saldoCaixa = dadosCaixa.saldo_inicial;
      }

      this.financeiroService.listarLancamentos().subscribe((lancamentos: Lancamento[]) => {
        const mesAtual = new Date().getMonth();
        const anoAtual = new Date().getFullYear();

        this.totalEntradasMes = lancamentos
          .filter(l => l.tipo === 'receita' && new Date(l.data_vencimento).getMonth() === mesAtual && new Date(l.data_vencimento).getFullYear() === anoAtual)
          .reduce((sum, l) => sum + l.valor, 0);

        this.totalSaidasMes = lancamentos
          .filter(l => l.tipo === 'despesa' && new Date(l.data_vencimento).getMonth() === mesAtual && new Date(l.data_vencimento).getFullYear() === anoAtual)
          .reduce((sum, l) => sum + l.valor, 0);
      });
    });
  }

  carregarGraficoFluxo() {
    this.financeiroService.listarLancamentos().subscribe((lancamentos: Lancamento[]) => {
      const agrupado: Record<string, { receita: number; despesa: number }> = {};

      lancamentos.forEach(l => {
        const mes = new Date(l.data_vencimento).toLocaleString('default', { month: 'short', year: 'numeric' });
        if (!agrupado[mes]) agrupado[mes] = { receita: 0, despesa: 0 };
        if (l.tipo === 'receita') agrupado[mes].receita += l.valor;
        else agrupado[mes].despesa += l.valor;
      });

      const categorias = Object.keys(agrupado);
      const receitas = categorias.map(mes => agrupado[mes].receita);
      const despesas = categorias.map(mes => agrupado[mes].despesa);

      this.chartFluxo = {
        series: [
          { name: 'Receitas', data: receitas },
          { name: 'Despesas', data: despesas }
        ],
        chart: { type: 'bar', height: 350 },
        xaxis: { categories: categorias },
        title: { text: 'Fluxo de Caixa Mensal' }
      };
    });
  }

  carregarGraficoCategorias() {
    this.financeiroService.listarLancamentos().subscribe((lancamentos: Lancamento[]) => {
      const despesas = lancamentos.filter(l => l.tipo === 'despesa');
      const categoriasUnicas = [...new Set(despesas.map(d => d.categoria))];
      const valores = categoriasUnicas.map(cat =>
        despesas.filter(d => d.categoria === cat).reduce((sum, d) => sum + d.valor, 0)
      );

      this.chartCategorias = {
        series: valores,
        chart: { type: 'pie', height: 350 },
        labels: categoriasUnicas,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: { width: 300 },
              legend: { position: 'bottom' }
            }
          }
        ]
      };
    });
  }
}
