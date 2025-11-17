'use server'
interface data{
    userId: string;
    categoriaId: string;
    nome: string;
    valor: number;
    data: Date;
    descricao: string;
}
import { addMovimentacao } from "@/services/movimentacaoService"

export async function inserirMovimentos(data:data): Promise<string|undefined>{
    try{
        await addMovimentacao(data)
        return 'tudo okay'
    }catch(err){
        console.log('Falha ao inserir os movimentos'+err)
    }

}