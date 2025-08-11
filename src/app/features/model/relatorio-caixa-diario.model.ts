import { Caixa } from "./caixa.model";

export interface RelatorioCaixaDiario {
  data: string;
  caixa: Caixa | null;
  totalEntradas: number;
  totalSaidas: number;
  saldoPrevisto: number;
}
