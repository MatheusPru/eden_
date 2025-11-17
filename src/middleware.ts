 //src/middleware.ts
 import { NextResponse } from 'next/server';
 import type { NextRequest } from 'next/server';
 import { jwtVerify } from 'jose';

 const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

 const publicOnlyPaths = ['/', '/login', '/cadastrar'];
 const protectedPaths = [
  '/dashboard',
  '/categorias',
  '/configPerfil',
  '/resumoMensal',
  '/metas',
  '/movimentos'
 ];

 export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('authToken')?.value;

  const isProtectedPath = protectedPaths.some(prefix => pathname.startsWith(prefix));
  const isPublicOnlyPath = publicOnlyPaths.includes(pathname);

   //--- LÓGICA PARA USUÁRIOS LOGADOS ---
  if (token) {
    if (isPublicOnlyPath) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (isProtectedPath) {
      try {
        await jwtVerify(token, JWT_SECRET);
        return NextResponse.next();
     } catch (error) {
        if (error instanceof Error) {
           console.log("Token inválido ou expirado, redirecionando:", error.message);
         } else {
           console.log("Erro desconhecido ao verificar o token:", error);
         }

        const response = NextResponse.redirect(new URL('/', request.url));
        response.cookies.delete('authToken');
        return response;
     }
    }
  }
 
  if (!token) {
    if (isProtectedPath) {
     return NextResponse.redirect(new URL('/', request.url));
    }
  }

   //Se a rota não se encaixa em nenhuma regra especial, permita o acesso.
  return NextResponse.next();
 }

  //--- MATCHER (sem alterações) ---
 export const config = {
     matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
   ],
 };