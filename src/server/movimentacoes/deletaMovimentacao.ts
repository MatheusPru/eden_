'use server'

import { removeMovimentacao } from "@/services/movimentacaoService"

export default async function deletaMovimentacao(id:string):Promise<string|undefined> {
    try{
         await removeMovimentacao(id)
         return "Deleção correta"
    }catch(err){
        console.log("Erro ao remover a movimentacao",err)
    }
}