import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cliente {
  id?: number;
  nome: string;
  email: string;
  telefone: string;
}

@Injectable({ providedIn: 'root' })
export class ClienteService {
  private apiUrl = 'https://bestwaytravel-backend.onrender.com/api/clientes';

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> { return this.http.get<Cliente[]>(this.apiUrl); }

  getCliente(id: number): Observable<Cliente> { return this.http.get<Cliente>(`${this.apiUrl}/${id}`); }

  addCliente(cliente: Cliente): Observable<Cliente> { return this.http.post<Cliente>(this.apiUrl, cliente); }

  updateCliente(id: number, cliente: Cliente): Observable<Cliente> { return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente); }

  deleteCliente(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
