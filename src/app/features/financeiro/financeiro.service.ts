import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../clientes/clientes.service';

interface Lancamento

@Injectable({
  providedIn: 'root'
})
/**
 * Service responsible for handling financial operations and business logic
 * related to the "financeiro" (financial) feature of the application.
 *
 * @remarks
 * This service can be extended to include methods for managing transactions,
 * processing payments, generating financial reports, and other related tasks.
 */
export class FinanceiroService {

  private apiUrl = 'https://bestwaytravel-backend.onrender.com/api/financeiro';

  constructor(private http: HttpClient) {}

  listarLancamentos(): Observable<Lancamento[]> {
    return this.http.get<any[]>(`${this.apiUrl}/lancamentos`);
  }

  getClientes(): Observable<Cliente[]> { return this.http.get<Cliente[]>(this.apiUrl); }

  getCliente(id: number): Observable<Cliente> { return this.http.get<Cliente>(`${this.apiUrl}/${id}`); }

  addCliente(cliente: Cliente): Observable<Cliente> { return this.http.post<Cliente>(this.apiUrl, cliente); }

  updateCliente(id: number, cliente: Cliente): Observable<Cliente> { return this.http.put<Cliente>(`${this.apiUrl}/${id}`, cliente); }

  deleteCliente(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
  // Simulated in-memory data store
  private items: any[] = [];
  private idCounter = 1;

  // Create
  create(item: any): any {
    const newItem = { ...item, id: this.idCounter++ };
    this.items.push(newItem);
    return newItem;
  }

  // Read all
  getAll(): any[] {
    return [...this.items];
  }

  // Read by id
  getById(id: number): any | undefined {
    return this.items.find(item => item.id === id);
  }

  // Update
  update(id: number, updatedItem: any): any | undefined {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items[index] = { ...this.items[index], ...updatedItem, id };
      return this.items[index];
    }
    return undefined;
  }

  // Delete
  delete(id: number): boolean {
    const index = this.items.findIndex(item => item.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }
}
