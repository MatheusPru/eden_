import prisma from './connection'

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};

export const getUserByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const getUserList = async () => {
  return prisma.user.findMany();
};

export const createUser = async (data: { name: string; email: string; password: string }) => {
  return prisma.user.create({ data: { ...data, active: true } });
};

export const activateUser = async (id: string) => {
  return prisma.user.update({ where: { id }, data: { active: true } });
};
export const updateUser = async (id: string,data: { name: string, email:string, password:string, data?:Date, pais?:string, estado?:string}) => {
  return prisma.user.update({ where: { id }, data: { ...data} });
};
