import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusFatura'
})
export class StatusFaturaPipe implements PipeTransform {
  transform(value: string): string {
    const status: {[key: string]: string} = {
      'ABERTA': 'Aberta',
      'PAGA': 'Paga',
      'VENCIDA': 'Vencida',
      'CANCELADA': 'Cancelada'
    };
    return status[value] || value;
  }
}