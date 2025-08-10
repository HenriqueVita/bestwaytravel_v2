import { FaturaItem } from "./fatura-item.model";

export interface Fatura {
  id?: number;
  numero: string;
  cliente: {
    id: number;
    nome: string;
  };
  valorTotal: number;
  valorPago: number;
  dataEmissao: Date;
  dataVencimento: Date;
  dataPagamento?: Date;
  status: 'ABERTA' | 'PAGA' | 'VENCIDA' | 'CANCELADA';
  itens: FaturaItem[];
  observacoes?: string;
}
