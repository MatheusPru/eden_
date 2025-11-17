// lib/actions.ts

'use server'; // Diretiva que marca este arquivo como contendo Server Actions

import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { fetchUser } from '@/services/userService';

// Definindo o tipo do payload do nosso JWT para segurança de tipo
interface JwtPayload {
  userId: string;
  iat: number;
  exp: number;
}

/**
 * Uma função auxiliar segura para obter a sessão do usuário no servidor.
 * Ela pode ser usada em qualquer Server Action ou Route Handler.
 */
async function getUserSession() {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get('authToken');

  if (!tokenCookie) {
    return null; // Usuário não está logado
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

  try {
    const { payload } = await jwtVerify<JwtPayload>(tokenCookie.value, secret);
    // Retorna o payload decodificado se o token for válido
    return payload;
  } catch (error) {
    // Token inválido (expirado, assinatura incorreta, etc.)
    console.error('Falha na verificação do JWT:', error);
    return null;
  }
}


// Exemplo de Server Action que precisa do ID do usuário
export async function getMyAccountData() {
  const session = await getUserSession();

  if (!session) {
    // O usuário não está autenticado ou a sessão é inválida
    throw new Error('Não autorizado: Você precisa estar logado.');
  }

  // Agora você tem o ID do usuário de forma segura!
  const userId = session.userId;
  const user = await fetchUser(userId)
  
  if(!user)
    throw new Error('Erro usuário não encontrado.');

  return user;
}