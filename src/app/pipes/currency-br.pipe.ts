import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'currencyBr'
})
export class CurrencyBrPipe extends CurrencyPipe implements PipeTransform {
  override transform(value: any, ...args: any[]): any {
    return super.transform(value, 'BRL', 'symbol', '1.2-2', 'pt');
  }
}