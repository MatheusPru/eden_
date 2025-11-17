import {getLimiteMensalByCategoria, getLimiteMensalById, getLimitesMensaisByUser, createLimiteMensal, deleteLimiteMensal, updateLimiteMensal} from '../data/limiteMensal';

export const fetchLimitesMensaisByUser = async (userId: string) => {
    return getLimitesMensaisByUser(userId);
}

export const fetchLimiteMensalById = async (id: string) => {
    return getLimiteMensalById(id);
}

export const addLimiteMensal = async (data: { userId: string; categoriaId: string; valor: number; data: Date;}) => {
    return createLimiteMensal(data);
}

export const removeLimiteMensal = async (id: string) => {
    return deleteLimiteMensal(id);
}

export const modifyLimiteMensal = async (id: string, data: { nome?: string; valor?: number; data?: Date; categoriaId?: string; }) => {
    return updateLimiteMensal(id, data);
}

export const fetchLimiteMensalByCategoria = async (categoriaId: string, userId: string) => {
    return getLimiteMensalByCategoria(categoriaId, userId);
}