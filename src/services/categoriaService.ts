import {getCategoriaById, getCategoriaByUser, createCategoria, deleteCategoria, updateCategoria} from '../data/categoria';

export const fetchCategoriaByUser = async (userId: string) => {
    return getCategoriaByUser(userId);
}

export const fetchCategoriaById = async (id: string) => {
    return getCategoriaById(id);
}

export const addCategoria = async (data: { userId: string; name: string; description: string; valor: number, desconto: boolean }) => {
    return createCategoria(data);
}

export const removeCategoria = async (id: string) => {
    return deleteCategoria(id);
}

export const modifyCategoria = async (id: string, data: { name?: string; description?: string; desconto?: boolean }) => {
    return updateCategoria(id, data);
}