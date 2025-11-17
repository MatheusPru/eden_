'use client';
import DadosMovimentos from "@/components/dadosMovimentos";
import { getMyAccountData } from "@/server/getUser";
import { useEffect, useState } from "react";

export default function Home() {

  const dataAtual = new Date().toLocaleDateString('pt-BR', {
    month: '2-digit',
    year: 'numeric'
  }).toString();
  const [userId, setUserId] = useState('');
  const [userName, setUsername] = useState('');

  useEffect(() => {

    const fetchUserData = async () => {
      try {

        const userData = await getMyAccountData(); 
        if (userData) {
          setUserId(userData.id);
          setUsername(userData.name);
        }
      } catch (error) {
        console.error("Falha ao buscar dados da conta:", error);
      }
    };

    fetchUserData();

  }, []);

  const dados ={
    userID : userId,
    dataAtual : dataAtual,
  }

  return (
    <div className="flex flex-col gap-6 mt-3">
      <div className="p-2 flex flex-row text-right items-center gap-4">
        <svg className="w-24 h-24 text-verde-claro dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
        </svg>
        <h1 className="text-4xl font-bold montserrat text-verde-claro dark:text-white">Olá, {userName}!</h1>
      </div>
      <DadosMovimentos dados={dados}></DadosMovimentos>
    </div>
  );
}
