import prisma from './connection'
export const getCategoriaByUser = async (userId: string) => {
  return prisma.categoria.findMany({ where: { userId } });
};

export const getCategoriaById = async (id: string) => {
    return prisma.categoria.findUnique({ where: { id } });
}

export const updateCategoria = async (id: string, data: { name?: string; description?: string; desconto?: boolean}) => {
    return prisma.categoria.update({ where: { id }, data: data });
}

export const deleteCategoria = async (id: string) => {
    return prisma.categoria.delete({ where: { id } });
}

export const createCategoria = async (data: { userId: string; name: string; description: string; valor: number, desconto: boolean }) =>
{
    //Todo: confirir os valores iniciais de concluido e desconto
    return prisma.categoria.create({ data: data });
}