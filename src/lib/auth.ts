// src/lib/auth.ts
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

interface UserPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

export const verifyAuth = async (request: NextRequest): Promise<UserPayload> => {
  // 1. Pega o token do cookie da requisição
  const token = request.cookies.get('authToken')?.value;

  // 2. Se não houver token, rejeita a requisição
  if (!token) {
    throw new Error('Missing authentication token');
  }

  try {
    // 3. Verifica e decodifica o token usando a chave secreta
    const verifiedPayload = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    return verifiedPayload;
  } catch (error) {
    // 4. Se o token for inválido (expirado, adulterado), rejeita a requisição
    throw new Error('Your token is invalid.');
  }
};