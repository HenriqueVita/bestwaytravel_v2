import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Fatura } from '../model/fatura.model';


@Injectable({
  providedIn: 'root'
})
export class FaturaService {
  private apiUrl = `${environment.apiUrl}/faturas`;

  constructor(private http: HttpClient) { }

  getAll(): Observable<Fatura[]> {
    return this.http.get<Fatura[]>(this.apiUrl);
  }

  getById(id: number): Observable<Fatura> {
    return this.http.get<Fatura>(`${this.apiUrl}/${id}`);
  }

  create(fatura: Fatura): Observable<Fatura> {
    return this.http.post<Fatura>(this.apiUrl, fatura);
  }

  update(id: number, fatura: Fatura): Observable<Fatura> {
    return this.http.put<Fatura>(`${this.apiUrl}/${id}`, fatura);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  pagarFatura(id: number, dataPagamento: Date): Observable<Fatura> {
    return this.http.post<Fatura>(`${this.apiUrl}/${id}/pagar`, { dataPagamento });
  }

  cancelarFatura(id: number): Observable<Fatura> {
    return this.http.post<Fatura>(`${this.apiUrl}/${id}/cancelar`, {});
  }

  getRelatorioFaturas(params: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/relatorio`, { params });
  }
}