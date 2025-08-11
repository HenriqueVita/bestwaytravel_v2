// vendas.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VendasService {
  private http = inject(HttpClient);

  listar(): Observable<any[]> {
    return this.http.get<any[]>(`${(window as any).__env?.API_URL || 'http://localhost:3000/api'}/vendas`);
  }

  confirmarVenda(orcamentoId: number) {
    return this.http.post(`${(window as any).__env?.API_URL || 'http://localhost:3000/api'}/vendas/${orcamentoId}/confirmar`, {});
  }
}
