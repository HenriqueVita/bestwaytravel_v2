import { Component, OnInit } from '@angular/core';
import { ClienteService, Cliente } from './clientes.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './clientes.component.html',
})
export class ClienteComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(data => {
      this.clientes = data;
    });
  }

  deletar(id: number) {
    this.clienteService.deleteCliente(id).subscribe(() => {
      this.clientes = this.clientes.filter(c => c.id !== id);
    });
  }
}
