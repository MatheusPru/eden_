'use server'

import { fetchMovimentacaoByUser } from "@/services/movimentacaoService"

interface movimentacoes {
    id: string;
    userId: string;
    nome: string;
    descricao: string | null;
    data: Date;
    valor: number;
    categoriaId: string;
}

export default async function buscaMovimentos(userId:string):Promise<movimentacoes[]|undefined> {
    try{
        const movimentacoes = await fetchMovimentacaoByUser(userId)
        return movimentacoes
    }catch(err){
        console.log("Erro ao remover a movimentacao"+err)
    }
    
}