'use server'

import { removeCategoria } from "@/services/categoriaService";


export default async function deletaCategoria(id:string):Promise<string|undefined> {
    try{
         await removeCategoria(id)
         return "Deleção correta"
    }catch(err){
        console.log("Erro ao remover a Categoria",err)
    }
}