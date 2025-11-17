import prisma from './connection'

export const getLimitesMensaisByUser = async (userId: string) => {
    return prisma.limiteMensal.findMany({ where: { userId } });
    }

export const getLimiteMensalById = async (id: string) => {
    return prisma.limiteMensal.findUnique({ where: { id } });
}

export const updateLimiteMensal = async (id: string, data: { valor?: number; data?: Date; categoriaId?: string; }) => {
    return prisma.limiteMensal.update({ where: { id }, data: data });
}

export const deleteLimiteMensal = async (id: string) => {
    return prisma.limiteMensal.delete({ where: { id } });
}

export const createLimiteMensal = async (data: { userId: string; categoriaId: string; valor: number; data: Date; }) =>
{
    return prisma.limiteMensal.create({ data: data });
}

export const getLimiteMensalByCategoria = async (categoriaId: string, userId: string) => {
    return prisma.limiteMensal.findMany({ where: { categoriaId, userId } });
}