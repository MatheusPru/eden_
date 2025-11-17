'use server'
interface Movimentacoes{
    movimentacoes: {
        data: Date;
        id: string;
        userId: string;
        nome: string;
        descricao: string | null;
        valor: number;
        categoriaId: string;
    }[];
    total: any;
    categoriaMap: {
        [key: string]: {
            valor: number;
            nome: string;
            desconto: boolean;
        };
    };
}
import { getMonthlySummaryByUser } from "@/services/movimentacaoService"

export async function buscaPorMes(userId:string, year : number, month : number):Promise<Movimentacoes|void> {
    try{
        const movis = await getMonthlySummaryByUser(userId,year,month)
        if(!movis)
            throw new Error('Erro usuário não encontrado.');

        return movis
    }catch(err){
        console.log("Erro ao sumarizar por mes"+err)
    }
}