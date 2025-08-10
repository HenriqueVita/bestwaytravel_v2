import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente, ClienteService } from '../../clientes/clientes.service';
import { Fatura } from '../../model/fatura.model';
import { FaturaService } from '../fatura.service';
import { SharedModule } from "src/app/theme/shared/shared.module";

@Component({
  selector: 'app-fatura-form',
  templateUrl: './faturas-form.component.html',
  styleUrls: ['./faturas-form.component.scss'],
  imports: [SharedModule]
})
export class FaturaFormComponent implements OnInit {
  form: FormGroup;
  loading = false;
  clientes: Cliente[] = [];
  hoje = new Date();

  constructor(
    private fb: FormBuilder,
    private faturaService: FaturaService,
    private clienteService: ClienteService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<FaturaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Fatura
  ) {
    this.form = this.fb.group({
      id: [null],
      numero: ['', Validators.required],
      cliente: [null, Validators.required],
      dataEmissao: [new Date(), Validators.required],
      dataVencimento: ['', Validators.required],
      status: ['ABERTA', Validators.required],
      itens: this.fb.array([this.criarItem()]),
      observacoes: ['']
    });
  }

  ngOnInit(): void {
    this.carregarClientes();
    
    if (this.data) {
      this.form.patchValue({
        id: this.data.id,
        numero: this.data.numero,
        cliente: this.data.cliente,
        dataEmissao: this.data.dataEmissao,
        dataVencimento: this.data.dataVencimento,
        status: this.data.status,
        observacoes: this.data.observacoes
      });

      // Limpa os itens padrão
      this.itens.clear();

      // Adiciona os itens da fatura
      this.data.itens.forEach(item => {
        this.itens.push(this.fb.group({
          id: [item.id],
          descricao: [item.descricao, Validators.required],
          quantidade: [item.quantidade, [Validators.required, Validators.min(1)]],
          valorUnitario: [item.valorUnitario, [Validators.required, Validators.min(0.01)]],
          valorTotal: [item.valorTotal]
        }));
      });
    }
  }

  carregarClientes(): void {
    this.clienteService.getClientes().subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
    });
  }

  get itens(): FormArray {
    return this.form.get('itens') as FormArray;
  }

  criarItem(): FormGroup {
    return this.fb.group({
      id: [null],
      descricao: ['', Validators.required],
      quantidade: [1, [Validators.required, Validators.min(1)]],
      valorUnitario: ['', [Validators.required, Validators.min(0.01)]],
      valorTotal: [0]
    });
  }

  adicionarItem(): void {
    this.itens.push(this.criarItem());
  }

  removerItem(index: number): void {
    this.itens.removeAt(index);
  }

  calcularTotalItem(index: number): void {
    const item = this.itens.at(index);
    const quantidade = item.get('quantidade')?.value || 0;
    const valorUnitario = item.get('valorUnitario')?.value || 0;
    const valorTotal = quantidade * valorUnitario;
    item.get('valorTotal')?.setValue(valorTotal);
  }

  calcularTotalFatura(): number {
    return this.itens.controls.reduce((total, item) => total + (item.get('valorTotal')?.value || 0), 0);
  }

  salvar(): void {
    if (this.form.valid && this.itens.length > 0) {
      this.loading = true;
      const fatura = this.form.value as Fatura;
      fatura.valorTotal = this.calcularTotalFatura();

      const operacao = fatura.id 
        ? this.faturaService.update(fatura.id, fatura)
        : this.faturaService.create(fatura);

      operacao.subscribe({
        next: () => {
          this.snackBar.open('Fatura salva com sucesso!', 'Fechar', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: () => {
          this.snackBar.open('Erro ao salvar fatura.', 'Fechar', { duration: 3000 });
          this.loading = false;
        }
      });
    }
  }
}