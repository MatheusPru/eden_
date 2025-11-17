'use client';

import { useState } from "react";
import { InputMovimentos } from "../inputMovimentos";
import { ListaMovimentos } from "../listaMovimentos";
interface Movimentacoes {
    data: Date;
    nome: string;
    valor: number;
    id: string;
    descricao: string | null;
    userId: string;
    categoriaId: string;
}
export default function DadosMovimentos(
    {dados}: {dados: {dataAtual: string, userID: string}}
){
    const [movimentacoes, setMovimentacoes] = useState<Movimentacoes[]>([]);
    return(
        <div className='flex flex-col gap-6'>
        <InputMovimentos dados={dados} setMovimentacoes = {setMovimentacoes} movimentacoes={movimentacoes}></InputMovimentos>
        <ListaMovimentos dados={dados}  setMovimentacoes={setMovimentacoes} movimentacoes={movimentacoes} ></ListaMovimentos>
        </div>
    )
}