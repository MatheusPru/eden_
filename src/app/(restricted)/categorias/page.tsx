'use client'

import DadosCategoria from "@/components/dadosCategoria";
import { getMyAccountData } from "@/server/getUser";
import { useEffect, useMemo, useState } from "react";

export default function Page(){

    const [userID, setUserId] = useState('');
    
    useEffect(() => {
    async function fetchUserData() {
        try {
        const response = await getMyAccountData()

        if (!response) {
            throw new Error("Erro ao buscar dados protegidos");
        }   
        const userData = response
        setUserId(userData.id); 
        } catch (error) {
        console.error("Falha ao buscar dados protegidos:", error);
        }
    }
    fetchUserData();
    }, []);

    const dados = {
        userID,
      };
    return (
        <>
        <DadosCategoria dados={dados}></DadosCategoria>
        </>
    )
}