// src/app/orcamentos/orcamentos.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Orcamento } from '../model/orcamento.model';

@Injectable({ providedIn: 'root' })
export class OrcamentosService {
  private http = inject(HttpClient);
  private baseUrl = (window as any).__env?.apiUrl;
  // simples cache via signal
  orcamentosSignal = signal<Orcamento[]>([]);

  listar(): Observable<Orcamento[]> {
    return this.http.get<Orcamento[]>(`${this.baseUrl}/orcamentos`).pipe(
      tap(list => this.orcamentosSignal.set(list)),
      catchError(err => { console.error('listar orçamentos', err); return of([]); })
    );
  }

  obter(id: number) {
    return this.http.get<Orcamento>(`${this.baseUrl}/orcamentos/${id}`);
  }

  criar(o: Orcamento) {
    return this.http.post<Orcamento>(`${this.baseUrl}/orcamentos`, o);
  }

  atualizar(id: number, patch: Partial<Orcamento>) {
    return this.http.patch<Orcamento>(`${this.baseUrl}/orcamentos/${id}`, patch);
  }

  deletar(id: number) {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/orcamentos/${id}`);
  }

  confirmarVenda(id: number) {
    return this.http.post(`${this.baseUrl}/orcamentos/${id}/confirmar-venda`, {});
  }
}
