"use client"; // Adicione esta linha no topo para torná-lo um Client Component

import Link from "next/link";
import { useState } from "react";
import type React from "react";
import { validaLogin } from "@/server/login"

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true);
    setError('');
    try{
      setError(await validaLogin(email,password))
    }catch{

    }finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="flex flex-grow bg-[#f3f4f6] items-center justify-center min-h-screen pb-42">
      <div className="flex flex-col max-w-xl sm:rounded-2xl bg-white items-center justify-center p-8 w-full shadow-stone-500 shadow-sm">
        <div className="mb-8">
          <h1 id="font-epunda" className="font-medium text-[2rem] text-[#436543]">EDEN</h1>
        </div>
        <div className="w-full">
          <form onSubmit={(e)=>handleSubmit(e)} className="flex flex-col items-center gap-y-6">
            <div className="flex w-4/6 flex-col gap-y-4">
              <div className="flex flex-col gap-y-2">
                <label htmlFor="email" className="font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="p-2 border border-gray-300 rounded-md"
                  value={email} // Controle o valor com o estado
                  onChange={(e) => setEmail(e.target.value)} // Atualize o estado
                  required
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <label htmlFor="senha" className="font-medium text-gray-700">
                  Senha
                </label>
                <input
                  id="senha"
                  type="password"
                  placeholder="••••••••"
                  className="p-2 border border-gray-300 rounded-md"
                  value={password} // Controle o valor com o estado
                  onChange={(e) => setPassword(e.target.value)} // Atualize o estado
                  required
                />
              </div>

              {/* Exibe a mensagem de erro, se houver */}
              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <div className="flex flex-row gap-x-2.5 justify-center">
                <button 
                  type="submit" 
                  className="text-white sm:text-[15px] rounded-md bg-[#0f172b] w-full text-center py-2 hover:bg-[#1d2b4e] transition-colors delay-75 disabled:bg-gray-400"
                  disabled={isLoading} // Desabilita o botão durante o carregamento
                >
                  {isLoading ? 'Entrando...' : 'Login'}
                </button>
              </div>

              <div className="flex flex-row justify-between" >
                <Link className="text-blue-600 underline text-[14px]" href='/cadastrar'>
                  Cadastrar-se
                </Link>
                <Link className="text-blue-600 underline text-[14px]" href='/recuperar'>
                  Recuperar Senha
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}