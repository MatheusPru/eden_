import prisma from './connection'

export const getMovimentacaoByUser = async (userId: string) => {
  return prisma.movimentacao.findMany({ where: { userId } });
};

export const getMovimentacaoByCategoria = async (categoriaId: string, userId: string) => {
    return prisma.movimentacao.findMany({ where: { categoriaId, userId } });
}

export const getMovimentacaoByRange = async (startDate: Date, endDate: Date, userId: string) => {
    return prisma.movimentacao.findMany({ where: { data: { gte: startDate, lte: endDate }, userId } });
}

export const createMovimentacao = async (data: { userId: string; categoriaId: string; nome: string; valor: number; data: Date; descricao: string; }) =>
{
    return prisma.movimentacao.create({ data: data });
}

export const deleteMovimentacao = async (id: string) => {
    return prisma.movimentacao.delete({ where: { id } });
}

export const updateMovimentacao = async (id: string, data: { nome?: string; valor?: number; data?: Date; descricao?: string; categoriaId?: string; }) => {
    return prisma.movimentacao.update({ where: { id }, data: data });
}

export const getMovimentacaoById = async (id: string) => {
    return prisma.movimentacao.findUnique({ where: { id } });
}