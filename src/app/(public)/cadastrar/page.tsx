"use client";
import Link from "next/link";
import { useState } from "react";
import { validaCadastro } from "@/server/cadastro";

export default function Cadastrar() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!termsAccepted) {
      setError('Você precisa concordar com os Termos de Uso para continuar.');
      return; // Impede a execução do resto da função
    }
    
    setIsLoading(true);

    try {

      setError(await validaCadastro(name,email,password));


    } catch (err) {
      if(err instanceof Error)
        setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-grow bg-[#f3f4f6] items-center justify-center min-h-screen pb-30">
      <div className="flex flex-col max-w-xl sm:rounded-2xl bg-white items-center justify-center p-8 w-full shadow-stone-500 shadow-sm">
        <div className="mb-8">
          <h1 id="font-epunda" className="font-medium text-[2rem] text-[#436543]">EDEN</h1>
        </div>
        <div className="w-full">
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-y-6">
            <div className="flex w-5/6 flex-col gap-y-4">
             <div className="flex flex-col gap-y-2">
                <label htmlFor="name" className="font-medium text-gray-700">Nome</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  className="p-2 border border-gray-300 rounded-md"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <label htmlFor="email" className="font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="p-2 border border-gray-300 rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="flex flex-col gap-y-2">
                <label htmlFor="senha" className="font-medium text-gray-700">Senha</label>
                <input
                  id="senha"
                  type="password"
                  placeholder="••••••••"
                  className="p-2 border border-gray-300 rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-row gap-x-2.5 items-center">
                <input
                  type="checkbox"
                  id="checkboxTerm"
                  checked={termsAccepted} // Controla se está marcado pelo estado
                  onChange={(e) => setTermsAccepted(e.target.checked)} // Atualiza o estado com true/false
                />
                <label htmlFor="checkboxTerm" className="text-sm">
                  Concordo com os <Link className="text-blue-600 underline" href='#'>Termos de uso</Link>
                </label>
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <div className="flex flex-row gap-x-2.5 justify-center">
                <button
                  type="submit"
                  className="text-white sm:text-[15px] rounded-md bg-[#0f172b] w-full text-center py-2 hover:bg-[#1d2b4e] transition-colors delay-75 whitespace-nowrap"
                  disabled={isLoading}
                >
                  {isLoading ? 'Registrando...' : 'Cadastrar'}
                </button>
              </div>
              <div className="flex flex-row justify-end">
                <Link className="text-blue-600 underline text-[14px]" href='/login'>
                  Já tenho uma conta
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}