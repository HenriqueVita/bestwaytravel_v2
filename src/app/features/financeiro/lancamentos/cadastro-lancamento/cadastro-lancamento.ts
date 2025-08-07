import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FinanceiroService } from '../../financeiro.service';
import { Router } from '@angular/router';
import { SharedModule } from "src/app/theme/shared/shared.module";

@Component({
  selector: 'app-cadastro-lancamento',
  imports: [SharedModule],
  templateUrl: './cadastro-lancamento.html',
  styleUrl: './cadastro-lancamento.scss'
})
export class CadastroLancamentoComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private financeiroService: FinanceiroService,
    private router: Router
  ) {
    this.form = this.fb.group({
      data: ['', Validators.required],
      descricao: ['', Validators.required],
      tipo: ['receita', Validators.required],
      valor: ['', Validators.required]
    });
  }

  salvar() {
    if (this.form.valid) {
      this.financeiroService.create(this.form.value).subscribe(() => { this.router.navigate(['/financeiro']); });
    }
  }
}
