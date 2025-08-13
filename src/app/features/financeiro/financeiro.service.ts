// src/app/financeiro/services/financeiro.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { RelatorioCaixaDiario } from '../model/relatorio-caixa-diario.model';
import { Caixa } from '../model/caixa.model';
import { FluxoMes } from '../model/fluxo-mes.model';
import { Lancamento } from '../model/lancamento.model';

export interface CategoriaTotal {
  categoria: string;
  total: string;
}

@Injectable({
  providedIn: 'root'
})
export class FinanceiroService {

  private http = inject(HttpClient);
  private baseUrl = (window as any).__env?.apiUrl;

  // Signals para estado local (opcional)
  lancamentosSignal = signal<Lancamento[]>([]);
  caixaAbertoSignal = signal<Caixa | null>(null);

  // ------------------- LANÇAMENTOS -------------------
  listarLancamentos(filtros?: { start?: string; end?: string; tipo?: string; status?: string }): Observable<Lancamento[]> {
    let params = new HttpParams();
    if (filtros) {
      if (filtros.start) params = params.set('start', filtros.start);
      if (filtros.end) params = params.set('end', filtros.end);
      if (filtros.tipo) params = params.set('tipo', filtros.tipo);
      if (filtros.status) params = params.set('status', filtros.status);
    }
    return this.http.get<Lancamento[]>(`${this.baseUrl}/lancamentos`, { params }).pipe(
      map(l => {
        this.lancamentosSignal.set(l);
        return l;
      }),
      catchError(this.handleError<Lancamento[]>('listarLancamentos', []))
    );
  }

  obterLancamento(id: number) {
    return this.http.get<Lancamento>(`${this.baseUrl}/lancamentos/${id}`)
      .pipe(catchError(this.handleError<Lancamento>('obterLancamento')));
  }

  salvarLancamento(lancamento: Lancamento) {
    return this.http.post<Lancamento>(`${this.baseUrl}/lancamentos`, lancamento)
      .pipe(catchError(this.handleError<Lancamento>('salvarLancamento')));
  }

  atualizarLancamento(id: number, patch: Partial<Lancamento>) {
    return this.http.patch<Lancamento>(`${this.baseUrl}/lancamentos/${id}`, patch)
      .pipe(catchError(this.handleError<Lancamento>('atualizarLancamento')));
  }

  deletarLancamento(id: number) {
    return this.http.delete<{ message: string; lancamento?: Lancamento }>(`${this.baseUrl}/lancamentos/${id}`)
      .pipe(catchError(this.handleError<{ message: string; lancamento?: Lancamento }>('deletarLancamento')));
  }

  // ------------------- CAIXA -------------------
  listarCaixas(status?: 'aberto' | 'fechado') {
    let params = new HttpParams();
    if (status) params = params.set('status', status);
    return this.http.get<Caixa[]>(`${this.baseUrl}/caixa`, { params })
      .pipe(catchError(this.handleError<Caixa[]>('listarCaixas', [])));
  }

  listarCaixaAberto() {
    return this.listarCaixas('aberto').pipe(
      map(arr => {
        const aberto = arr.length ? arr[0] : null;
        this.caixaAbertoSignal.set(aberto);
        return aberto;
      }),
      catchError(() => of(null))
    );
  }

  abrirCaixa(caixa: Caixa) {
    return this.http.post<Caixa>(`${this.baseUrl}/caixa`, { caixa })
      .pipe(catchError(this.handleError<Caixa>('abrirCaixa')));
  }

  fecharCaixa(id: number, caixa: Partial<Caixa>) {
    return this.http.patch<Caixa>(`${this.baseUrl}/caixa/${id}`, { caixa })
      .pipe(catchError(this.handleError<Caixa>('fecharCaixa')));
  }

  obterCaixa(id: number) {
    return this.http.get<Caixa>(`${this.baseUrl}/caixa/${id}`)
      .pipe(catchError(this.handleError<Caixa>('obterCaixa')));
  }

  // ------------------- RELATÓRIOS -------------------
  relatorioFluxo(start?: string, end?: string) {
    let params = new HttpParams();
    if (start) params = params.set('start', start);
    if (end) params = params.set('end', end);

    return this.http.get<FluxoMes[]>(`${this.baseUrl}/relatorios/fluxo`, { params })
      .pipe(catchError(this.handleError<FluxoMes[]>('relatorioFluxo', [])));
  }

  relatorioCaixaDiario(date?: string) {
    let params = new HttpParams();
    if (date) params = params.set('date', date);
    return this.http.get<RelatorioCaixaDiario>(`${this.baseUrl}/relatorios/caixa-diario`, { params })
      .pipe(catchError(this.handleError<RelatorioCaixaDiario>('relatorioCaixaDiario')));
  }

  relatorioCategorias(start?: string, end?: string) {
    let params = new HttpParams();
    if (start) params = params.set('start', start);
    if (end) params = params.set('end', end);
    return this.http.get<CategoriaTotal[]>(`${this.baseUrl}/relatorios/categorias`, { params })
      .pipe(catchError(this.handleError<CategoriaTotal[]>('relatorioCategorias', [])));
  }

  // ------------------- HELPERS -------------------
  existeCaixaAberto() {
    return this.listarCaixaAberto().pipe(map(c => !!c));
  }

  salvarLancamentoSeCaixaAberto(lancamento: Lancamento) {
    return this.listarCaixaAberto().pipe(
      switchMap(caixa => {
        if (!caixa) return throwError(() => ({ status: 400, message: 'Não há caixa aberto' }));
        return this.salvarLancamento(lancamento);
      }),
      catchError(err => throwError(() => err))
    );
  }

  // ------------------- ERROS -------------------
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return throwError(() => error);
    };
  }
}
