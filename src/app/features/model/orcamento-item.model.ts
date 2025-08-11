import { ProdutoTipo } from "./produto.model";

export interface OrcamentoItem {
  produtoTipo: ProdutoTipo;
  descricao?: string;
  valor: number;
  taxa?: number; // valor da taxa aplicada nesse item (opcional)
}