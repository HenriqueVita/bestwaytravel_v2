export interface Lancamento {
  id?: number;
  data: string; // yyyy-MM-dd
  descricao: string;
  tipo: 'receita' | 'despesa';
  categoria_id: number;
  fatura_id: number;
  valor: number; 
  criado_em: string;
  categoria: string;
  status: 'PENDENTE' | 'PAGO' | 'CANCELADO';
  observacoes?: string;
  contaBancaria: string;
  recorrente?: boolean;
  periodoRecorrencia?: 'DIARIO' | 'SEMANAL' | 'MENSAL' | 'ANUAL';
}