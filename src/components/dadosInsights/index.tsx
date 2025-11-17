'use client';

import { useEffect, useState } from "react";
import { ListaMovimentosUmaVez } from "../listaMovimentosUmaVez";
import { AgrupaValorCategoria } from "../agrupaValorCategoria";
import { GraficoDePizzaCategoria } from "../graficos/graficoDePizzaCategoria";

export default function DadosInsight(
    {dados}: {dados: {dataAtual: string, userID: number}}
){
    const [envio, setEnvio] = useState(true);

    return(
        <div className='flex flex-col gap-6'>
        <ListaMovimentosUmaVez dados={dados}></ListaMovimentosUmaVez>
        <div className="w-full md:1/3 lg:w-1/5 mx-auto">
            <GraficoDePizzaCategoria dados={dados} titulo={'Gráfico de Gastos'}></GraficoDePizzaCategoria>
        </div>
        <AgrupaValorCategoria dados={dados}></AgrupaValorCategoria>
        </div>
    )
}