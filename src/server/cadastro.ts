"use server";
import "@/data/user"
import { getUserByEmail,createUser } from "@/data/user";
import { registerUser } from "@/services/userService";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function validaCadastro(name:string,email:string,password:string):Promise<string>{
    if (!email || !email.includes('@'))
        return "Email invalido"
    if(password.length<1)
        return "Senha nao pode ser vazia"
    if(name.length<1)
        return "Nome nao pode ser vazio"
    try {
    // 3. Buscar o usuário no banco de dados
    let user = await getUserByEmail(email)

    // 4. Verificar se o usuário existe 
    if (user) {
      return "O email ja possui uma conta" 
    }
    user = await registerUser(name,email,password)
    if (!user) {
      return "Falha ao registrar"
    }
    // Geração do Token JWT
    const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
        );

        // Criação do Cookie

      const cookieStore = await cookies();
      cookieStore.set('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600,
        path: '/',
      })

  } catch (error) {
    console.error(error);
    return "Ocorreu um erro no servidor. Tente novamente mais tarde." ;
  }
  redirect('/dashboard');

}