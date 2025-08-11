// src/app/orcamentos/models/orcamento.model.ts

import { FormaPagamento } from "./forma-pagamento.model";
import { ProdutoTipo } from "./produto.model";

export interface Orcamento {
  id?: number;
  nome_cliente: string;
  fornecedor?: string;
  loc_reserva?: string; // LOC/ID da reserva
  data_orcamento: string;   // ISO
  data_viagem?: string; // ISO
  produto: ProdutoTipo;
  valor: number;
  valor_total: number; // valor + taxa (calculado)
  taxa: number;
  percentual_comissao: number; // ex 10 para 10%
  incentivo: number;
  desconto: number;
  valor_comissao: number; // ( (%Comissão * Valor) + Incentivo - Desconto )
  forma_pagamento: FormaPagamento;
  data_pagamento?: string; // se faturado
  data_recebimento_comissao?: string; // se cartão
  observacoes?: string;
  criado_em?: string;
}
