import { Component, OnInit } from '@angular/core';
import { FinanceiroService } from './financeiro.service';

@Component({
  selector: 'app-financeiro',
  standalone: false,
  templateUrl: './financeiro.component.html',
  styleUrl: './financeiro.scss'
})
export class Financeiro implements OnInit {
  lancamentos: any[] = [];

  constructor(private financeiroService: FinanceiroService) {}

  ngOnInit() {
    this.carregarLancamentos();
  }

  carregarLancamentos() {
    this.financeiroService.listarLancamentos().subscribe(data => {
      this.lancamentos = data;
    });
  }
}

