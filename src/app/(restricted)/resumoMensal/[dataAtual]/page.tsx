'use client'

import { ListaMovimentos } from "@/components/listaMovimentos";
import ResumoMensalGrafico  from "@/components/resumoMensalGrafico"
import { getMyAccountData } from "@/server/getUser";
import { use, useEffect, useMemo, useState } from "react";
interface Movimentacoes {
    data: Date;
    nome: string;
    valor: number;
    id: string;
    descricao: string | null;
    userId: string;
    categoriaId: string;
}
export default function ResumoMensal(
    {params}: {params: Promise<{dataAtual: string}>}
){
    const parametros = use(params);
    let dataAtual = parametros.dataAtual
    

    dataAtual = dataAtual.replace('-', '/');

    const [userID, setUserId] = useState('');
            
    useEffect(() => {
    async function fetchUserData() {
        try {
        const response = await getMyAccountData()

        if (!response) {
            throw new Error("Erro ao buscar dados protegidos");
        }
            
        const userData = await response;
        setUserId(userData.id); 
        } catch (error) {
        console.error("Falha ao buscar dados protegidos:", error);
        }
    }
    fetchUserData();
    }, []);
    const [movimentacoes, setMovimentacoes] = useState<Movimentacoes[]>([]);
    
    return (
        <>
         {userID ? (
                <>
                    <ResumoMensalGrafico dados={{ userID, dataAtual }} />
                    <ListaMovimentos dados={{userID,dataAtual}} setMovimentacoes={setMovimentacoes} movimentacoes={movimentacoes}/>
                </>
            ) : (
                // Opcional: Mostrar uma mensagem de "carregando" para o usuário
                <p className="text-center mt-10">Carregando dados do usuário...</p>
            )}
        </>
    )
}