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
    <div>
      <DadosMovimentos dados={dados}></DadosMovimentos>
    </div>
  );
}
