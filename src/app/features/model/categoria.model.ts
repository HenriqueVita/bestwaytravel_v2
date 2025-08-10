export interface Categoria {
  id?: number;
  nome: string;  
  tipo: 'receita' | 'despesa';  
  cor: string;
  criado_em: string;
}