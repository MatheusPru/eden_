'use server'

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export async function realizeLogout() {
  try {
    const cookieStore = await cookies();

    // 1. Cria um cookie para invalidar o atual
    cookieStore.set('authToken','', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/',
    })

  } catch (err) {
   console.log('Erro ao realizar logout '+err)
  }
  redirect('/');
}