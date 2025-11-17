'use client';
import Loading from "@/components/loading/loading";
import DadosMovimentos from "@/components/dadosMovimentos";
import buscaCategorias from "@/server/categoria/buscaCategoria";
import { getMyAccountData } from "@/server/getUser";
import { useEffect, useState } from "react";
import buscaMovimentos from "@/server/movimentacoes/buscaMovimentacoes";

interface Categoria {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  valor: number | null;
  desconto: boolean;
}
interface Movimentacoes {
  data: Date;
  nome: string;
  valor: number;
  id: string;
  descricao: string | null;
  userId: string;
  categoriaId: string;
}

export default function Home() {

  const dataAtual = new Date().toLocaleDateString('pt-BR', {
    month: '2-digit',
    year: 'numeric'
  }).toString();
  const [userId, setUserId] = useState('');
  const [gastos, setGastos] = useState<Categoria[]>();
  const [rendimentos, setRendimentos] = useState<Categoria[]>()
  const [movimentacoes, setMovimentacoes] = useState<Movimentacoes[]>()
  const [categorias, setCategoria] = useState<Categoria[]>();
  const [concluidos, setConcluido] = useState<Categoria[]>();
  const [isLoading, setIsLoading] = useState(true);

  const carregarCategorias = async () => {
    try {
      if (userId) {
        const response = await buscaCategorias(userId)

        if (!response) {
          throw new Error('A resposta da rede não foi OK');
        }

        const dadosApi = response;
        setCategoria(dadosApi);
      } else {
        setCategoria([]);
      }

    } catch (error) {
      alert('Falha ao carregar as categorias:' + error);
    }
  };
  const carregarMovimentacoes = async () => {
    try {
      if (userId) {

        const movimentacoesApi = await buscaMovimentos(userId);
        if (!movimentacoesApi) {
          throw new Error('A resposta da rede não foi OK');
        }
        if (movimentacoesApi) {
          setMovimentacoes(movimentacoesApi);
        } else {
          setMovimentacoes([]);
        }
      }

    } catch (error) {
      alert('Falha ao carregar as movimentações:' + error);
    }
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getMyAccountData();
        if (userData) {
          setUserId(userData.id);
        }
      } catch (error) {
        alert("Falha ao buscar dados da conta: " + error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {

    const carregarDados = async () => {
      if (userId) {
        setIsLoading(true);
        try {
          //Esperar as DUAS requisições terminarem em paralelo
          await Promise.all([
            carregarCategorias(),
            carregarMovimentacoes()
          ]);
        } catch (error) {
          console.error("Falha ao carregar dados em paralelo:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setCategoria([]);
        setMovimentacoes([]);
        setIsLoading(false);
      }
    };

    carregarDados();

  }, [userId]);

  useEffect(() => {
    if (categorias && movimentacoes) {
      const gastos1: Categoria[] = [];
      const rendimentos1: Categoria[] = [];
      const concluidos1: Categoria[] = [];
      categorias.forEach(c => {
        const valorAtual = calcularTotalCategoria(c.id);
        if (c.valor) {
          if (c.valor <= valorAtual)
            concluidos1.push(c)
          else if (c.desconto)
            gastos1.push(c)
          else
            rendimentos1.push(c)
        }
        setGastos(gastos1);
        setRendimentos(rendimentos1);
        setConcluido(concluidos1);
      })
    } else {
      setGastos([]);
      setRendimentos([]);
      setConcluido([]);
    }
  }, [categorias, movimentacoes]);

  const calcularTotalCategoria = (categoriaId: string) => {
    if (!movimentacoes) {
      return 0;
    }

    // Filtra as movimentações por esta categoria e soma os valores
    const valorTotal = movimentacoes
      .filter(mov => mov.categoriaId === categoriaId)
      .reduce((total, mov) => total + mov.valor, 0); // 'reduce' soma os valores

    return valorTotal;
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-center font-extrabold text-2xl mb-8 mt-3">Metas Financeiras</h1>
      <div className="flex flex-col lg:flex-row mx-auto gap-2">
        <div className="flex-grow w-full">
          <div className="flex flex-col rounded-lg shadow-md bg-white pb-13 gap-1 m-2 mb-6 px-3">
            <h2 className="text-xl font-bold montserrat text-center pt-4 mb-6 text-rose-600">Metas de Gastos</h2>
            {
              categorias && gastos && gastos.length > 0 ? gastos.map(categoria => {
                const valorAtualGasto = calcularTotalCategoria(categoria.id);
                return (
                  <div key={categoria.id} className="flex flex-row shadow-sm rounded-lg bg-gray-50 border border-gray-200 p-4 m-2 mb-6 ">
                    <p className="text-center flex-grow">
                      <span className="font-bold">Categoria: </span>
                      <span>{categoria.name}</span>
                    </p>
                    <p className="text-center flex-grow ">
                      <span className="font-bold">Meta: </span>
                      <span className="">{categoria?.valor && 'R$' + (categoria?.valor).toFixed(2)}</span>
                    </p>
                    <p className="text-center flex-grow">
                      <span className="font-bold flex-grow">Atual: </span>
                      <span className="text-red-600 font-semibold">-{'R$' + valorAtualGasto.toFixed(2)}</span>
                    </p>
                  </div>

                )
              }) :
                <div className="flex flex-col items-center ">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-500">Não há meta para os gastos</p>
                </div>
            }
          </div>
        </div>
        <div className="flex-grow w-full">
          <div className="flex flex-col rounded-lg shadow-md bg-white pb-13 gap-1 m-2 mb-6">
            <h2 className="text-xl font-bold montserrat text-center pt-4 mb-6 text-green-600">Metas de Rendimentos</h2>
            {
              categorias && rendimentos && rendimentos.length > 0 ? rendimentos.map(categoria => {
                const valorAtualRendimento = calcularTotalCategoria(categoria.id);
                return (
                  <div key={categoria.id} className="flex flex-row shadow-sm rounded-lg bg-gray-50 border border-gray-200 p-4 m-2 mb-6">
                    <p className="text-center flex-grow">
                      <span className="font-bold">Categoria: </span>
                      <span>{categoria.name}</span>
                    </p>
                    <p className="text-center flex-grow ">
                      <span className="font-bold">Meta: </span>
                      <span className="">{categoria?.valor && 'R$' + (categoria?.valor).toFixed(2)}</span>
                    </p>
                    <p className="text-center flex-grow">
                      <span className="font-bold flex-grow">Atual: </span>
                      <span className="text-green-400">+{'R$' + valorAtualRendimento.toFixed(2)}</span>
                    </p>
                  </div>

                )
              }) :
                <div className="flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-500">Não há meta para os rendimentos</p>
                </div>
            }
          </div>
        </div>
      </div>
      <div className="flex flex-col max-w-3xl justify-center mx-auto">
        <h2 className="text-xl font-semibold montserrat mt-4 text-center mb-4 text-blue-600">Metas Concluídas</h2>
        <div className="flex flex-col p-6 gap-1 m-2 mb-6">
          {

            categorias && concluidos && concluidos.length > 0 ? concluidos.map(c => {
              const valorAtualRendimento = calcularTotalCategoria(c.id);
              return (
                <div key={c.id} className="flex flex-row rounded-lg shadow-sm bg-gray-50 border border-gray-200 p-4 m-2 mb-6">
                  <p className="text-center flex-grow">
                    <span className="font-bold">Categoria: </span>
                    <span>{c.name}</span>
                  </p>
                  <p className="text-center flex-grow ">
                    <span className="font-bold">Meta: </span>
                    <span className="">{c?.valor && 'R$' + (c?.valor).toFixed(2)}</span>
                  </p>
                  <p className="text-center flex-grow">
                    <span className="font-bold flex-grow">Atual: </span>
                    <span className={c.desconto ? "text-red-600 font-semibold" : "text-green-400 font-semibold"}>{c.desconto ? '-' : '+'}{'R$' + valorAtualRendimento.toFixed(2)}</span>
                  </p>
                </div>

              )
            }) :
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500 ">Não há metas concluidas</p>
            </div>
          }
        </div>
      </div>

    </div>
  );
}
