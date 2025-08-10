import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoLancamento'
})
export class TipoLancamentoPipe implements PipeTransform {
  transform(value: string): string {
    const tipos: {[key: string]: string} = {
      'RECEITA': 'Receita',
      'DESPESA': 'Despesa',
      'PENDENTE': 'Pendente',
      'PAGO': 'Pago',
      'CANCELADO': 'Cancelado'
    };
    return tipos[value] || value;
  }
}