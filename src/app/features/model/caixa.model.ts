export interface Caixa {
  id?: number;
  dataAbertura: string;
  saldo_inicial: number;
  dataFechamento?: string;
  saldoFinal?: number;
  status: 'aberto' | 'fechado';
}
