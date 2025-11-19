import { createMovimentacao, getMovimentacaoByCategoria, getMovimentacaoById, getMovimentacaoByRange, getMovimentacaoByUser, deleteMovimentacao, updateMovimentacao } from '../data/movimentacao';
import { getCategoriaById } from '../data/categoria';

export const fetchMovimentacaoByUser = async (userId: string) => {
    return getMovimentacaoByUser(userId);
}

export const fetchMovimentacaoByCategoria = async (categoriaId: string, userId: string) => {
    const movimentacoes = await getMovimentacaoByCategoria(categoriaId, userId);
    return movimentacoes;
}

export const fetchMovimentacaoByRange = async (startDate: Date, endDate: Date, userId: string) => {
    const movimentacoes = await getMovimentacaoByRange(startDate, endDate, userId);
    return movimentacoes;
}

export const fetchMovimentacaoById = async (id: string) => {
    return getMovimentacaoById(id);
}

export const addMovimentacao = async (data: { userId: string; categoriaId: string; nome: string; valor: number; data: Date; descricao: string; }) => {
    return createMovimentacao(data);
}

export const removeMovimentacao = async (id: string) => {
    return deleteMovimentacao(id);
}

export const modifyMovimentacao = async (id: string, data: { nome?: string; valor?: number; data?: Date; descricao?: string; categoriaId?: string; }) => {
    return updateMovimentacao(id, data);
}

export const getSummaryByUser = async (userId: string, startDate: Date, endDate: Date) => {
    const movimentacoes = await getMovimentacaoByRange(startDate, endDate, userId);
    const total = movimentacoes.reduce((acc: number, curr: { valor: number }) => acc + curr.valor, 0);
    const categoriaMap: { [key: string]: { valor: number , nome: string , desconto: boolean}} = {};

    // Usando for...of para iterar e aguardar as promessas
    for (const mov of movimentacoes) {
        if (categoriaMap[mov.categoriaId]) {
            categoriaMap[mov.categoriaId].valor += mov.valor;
        } else {
            // Aqui é onde o await funciona corretamente
            const categoria = await getCategoriaById(mov.categoriaId);
            categoriaMap[mov.categoriaId] = {
                valor: mov.valor,
                nome: categoria?.name ?? '',
                desconto: categoria?.desconto ?? false
            };
        }
    }

    // Retorno com movimentações, total e total por categoria
    return {
        movimentacoes, total, categoriaMap
    };
};


export const getMonthlySummaryByUser = async (userId: string, year: number, month: number) => {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999); // Último dia do mês
    return getSummaryByUser(userId, startDate, endDate);
}

export const getAnnualSummaryByUser = async (userId: string, year: number) => {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31, 23, 59, 59, 999); // Último dia do ano
    return getSummaryByUser(userId, startDate, endDate);
}