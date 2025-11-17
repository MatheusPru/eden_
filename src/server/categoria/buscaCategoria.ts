'use server'

import { fetchCategoriaByUser } from "@/services/categoriaService"
interface Categoria {
    id: string;
    userId: string;
    name: string;
    description: string | null;
    valor: number | null;
    desconto: boolean;
}
export default async function buscaCategorias(userId : string):Promise<Categoria[]|undefined>{
    try{
        const categorias = await fetchCategoriaByUser(userId)
        return categorias
    }catch(err){
        console.log('Erro ao buscar categorias'+err)
    }

}
