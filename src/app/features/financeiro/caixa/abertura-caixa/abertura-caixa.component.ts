import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinanceiroService } from '../../financeiro.service';
import { Caixa } from '../../../model/caixa.model';
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-abertura-caixa',
  templateUrl: './abertura-caixa.component.html',
  imports: [SharedModule]
})
export class AberturaCaixaComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private financeiroService: FinanceiroService) {
    this.form = this.fb.group({
      saldoInicial: [0, [Validators.required, Validators.min(0)]]
    });
  }

  abrir() {
    if (this.form.invalid) return;

    const novoCaixa: Caixa = {
      dataAbertura: new Date().toISOString(),
      saldo_inicial: this.form.value.saldoInicial,
      status: 'aberto'
    };

    this.financeiroService.abrirCaixa(novoCaixa).subscribe(() => {
      alert('Caixa aberto com sucesso!');
      this.form.reset();
    });
  }
}
