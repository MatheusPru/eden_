// Example of a service layer for user operations
import { getUserById, getUserByEmail, getUserList, createUser, activateUser, updateUser } from '../data/user';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';

// TODO: Não funcionando no momento
// export const sendActivationEmail = async (email: string, userId: string) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'mail@mail.com',
//       pass: 'zoez jdwt zrhj mbow$',
//     },
//   });

//   const activationLink = `http://localhost:3001/api/users/activate/${userId}`;
//   await transporter.sendMail({
//     from: 'mail@mail.com',
//     to: email,
//     subject: 'Activate your account',
//     html: `<p>Click <a href="${activationLink}">here</a> to activate your account.</p>`
//   });
// };

export const activateUserById = async (id: string) => {
  return await activateUser(id);
};

export const fetchUser = async (id: string) => {
  return await getUserById(id);
};

export const fetchUserList = async () => {
  return await getUserList();
};

export const registerUser = async (name: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await createUser({ name, email, password: hashedPassword });
};
export const UpdateUserConfigs = async (id:string,name: string, email: string, password: string,data?:Date, pais?:string, estado?:string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await updateUser( id, {name, email, password: hashedPassword, data, pais, estado});
};

