export interface Lancamento {
  id?: number;
  data: string; // yyyy-MM-dd
  descricao: string;
  tipo: 'receita' | 'despesa';
  categoria_id: number;
  status: 'pago' | 'pendente';
  fatura_id: number;
  valor: number; 
  criado_em: string;
}