'use client'

import { useEffect, useState } from "react";
import { PieChart } from "../graficoDePizza";
import { buscaPorMes } from "@/server/movimentacoes/buscaPeloMesECat";

type Movimentacao = {
  data: Date;
  id: string;
  userId: string;
  nome: string;
  descricao: string | null;
  valor: number;
  categoriaId: string;
}

interface Movs {
  movimentacoes: {
    data: Date;
    id: string;
    userId: string;
    nome: string;
    descricao: string | null;
    valor: number;
    categoriaId: string;
  }[];
  total: number;
  categoriaMap: {
    [key: string]: {
      valor: number;
      nome: string;
      desconto: boolean;
    };
  };
}


export default function ResumoMensalGrafico({ dados }: {
  dados: {
    dataAtual: string;
    userID: string
  },
}) {
  const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
  const [mes, setMes] = useState('')
  const [movs, setMovs] = useState<Movs | undefined>()
  const dataSeparada = dados.dataAtual ? dados.dataAtual.split('/') : ['', ''];
  const month = dataSeparada[0];
  const year = dataSeparada[1];
  const [entradas, setEntradas] = useState<Movimentacao[]>([]);
  const [descontos, setDescontos] = useState<Movimentacao[]>([]);

  const buscaMovimentosPorMes = async () => {
    if (dados.dataAtual && dados.userID) {
      try {
        const movimentos = await buscaPorMes(dados.userID, parseInt(year), parseInt(month))
        if (!movimentos)
          throw new Error('Erro!')
        setMovs(movimentos)
      } catch (err) {
        console.log("Erro ao coletar os movimentos" + err)
      }
    }
  }

  useEffect(() => {
    setMes(meses[parseInt(month) - 1])
    buscaMovimentosPorMes()
  }, [])

  useEffect(() => {
    if (movs && movs.movimentacoes) {

      const novosDescontos = movs.movimentacoes.filter((movimentacao) => {
        return movs.categoriaMap[movimentacao.categoriaId]?.desconto === true;
      });

      const novasEntradas = movs.movimentacoes.filter((movimentacao) => {
        return movs.categoriaMap[movimentacao.categoriaId]?.desconto === false;
      });

      setDescontos(novosDescontos);
      setEntradas(novasEntradas);
    }
  }, [movs]);

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-center py-5">Resumo do mês de {mes} no ano de {year}</h1>
      </div>
      <div className="flex flex-col lg:flex-row items-center flex-grow">
        <div className="w-full h-full lg:w-1/2 p-4">
          {entradas.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold text-center text-green-600 mb-4">Entradas de Dinheiro</h2>
              <div className="relative w-full max-w-96 mx-auto aspect-square">
                <PieChart movimentacoes={entradas} categorias={movs?.categoriaMap} />
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center">Nenhuma entrada registrada este mês.</p>
          )}
        </div>
        <div className="w-full h-full p-4 lg:w-1/2">
          {descontos.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold text-center text-red-600 mb-4">Gasto ao longo do mes</h2>
              <div className="relative w-full max-w-96 mx-auto aspect-square">
                <PieChart movimentacoes={descontos} categorias={movs?.categoriaMap}/>
              </div>
            </>
          ) : (
            <p className="text-gray-500 text-center">Nenhum desconto registrado este mês.</p>
          )}
        </div>
      </div>
    </div>
  );
}