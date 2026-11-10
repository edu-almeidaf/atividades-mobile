import type { Transacao, TransacaoInput } from '../types/Transacao';
import { api } from './api';

const BASE_URL = '/api/collections/transacoes/records';

interface ListResponse<T> {
  items: T[];
  totalItems: number;
}

// GET (lista) - as regras da coleção já filtram pelo usuário logado
export async function getTransacoes(): Promise<Transacao[]> {
  const response = await api.get<ListResponse<Transacao>>(BASE_URL, {
    params: { sort: '-created', perPage: 200 },
  });
  return response.data.items;
}

// GET (um registro)
export async function getTransacao(id: string): Promise<Transacao> {
  const response = await api.get<Transacao>(`${BASE_URL}/${id}`);
  return response.data;
}

// POST
export async function createTransacao(data: TransacaoInput, userId: string): Promise<Transacao> {
  const response = await api.post<Transacao>(BASE_URL, { ...data, user: userId });
  return response.data;
}

// PATCH
export async function updateTransacao(id: string, data: TransacaoInput): Promise<Transacao> {
  const response = await api.patch<Transacao>(`${BASE_URL}/${id}`, data);
  return response.data;
}

// DELETE
export async function deleteTransacao(id: string): Promise<void> {
  await api.delete(`${BASE_URL}/${id}`);
}
