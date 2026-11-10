export type TipoTransacao = 'entrada' | 'saida';

export interface Transacao {
  id: string;
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  user: string;
  created: string;
  updated: string;
}

export interface TransacaoInput {
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
}
