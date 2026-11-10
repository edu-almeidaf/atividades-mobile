export type TipoTransacao = 'entrada' | 'saida';

// Mesmos campos da coleção "transacoes" no PocketBase
export interface Transacao {
  id: string;
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  user: string;
  created: string;
  updated: string;
}

// Dados enviados no POST/PATCH
export interface TransacaoInput {
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
}
