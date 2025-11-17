'use client'

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Loading from "../loading/loading";
import buscaMovimentos from "@/server/movimentacoes/buscaMovimentacoes";
import deletaMovimentacao from "@/server/movimentacoes/deletaMovimentacao";
import buscaCategorias from "@/server/categoria/buscaCategoria";
import { buscaPorMes } from "@/server/movimentacoes/buscaPeloMesECat";
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

export function ListaMovimentos(
    { dados,setMovimentacoes,movimentacoes }: { 
        dados: { 
            dataAtual: string; 
            userID: string
        },
        setMovimentacoes : Dispatch<SetStateAction<Movimentacoes[]>>
        movimentacoes? : Movimentacoes[]
    },
) {
    const dataSeparada = dados.dataAtual ?  dados.dataAtual.split('/'): ['', ''];
    const month = dataSeparada[0];
    const year = dataSeparada[1];

    const [categorias, setCategoria] = useState<Categoria[]>([]);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const [isLoading, setIsLoading] = useState(true); // Começa como true
    const carregarMovimentacoes = async () => {
            try {
                if(dados.userID){
                    
                    const movimentacoesApi = await buscaPorMes(dados.userID,parseInt(year),parseInt(month));
                    if(movimentacoesApi){
                        setMovimentacoes(movimentacoesApi.movimentacoes);
                    } else {
                        setMovimentacoes([]);
                        setStatus('error');
                    }
                       setStatus('success');
                }
                
            } catch (error) {
                console.error('Falha ao carregar as movimentações:', error);
                setStatus('error');
            } finally {
                setIsLoading(false); 
            }
        };
        
    useEffect(() => {
        const carregarCategorias = async () => {
                    try {
                            if(dados.userID){
                                const response = await buscaCategorias(dados.userID)
                                
                                if (!response) {
                                    throw new Error('A resposta da rede não foi OK');
                                }
                                
                                const dadosApi = response;
                                setCategoria(dadosApi);
                            } else {
                                setCategoria([]);
                            }
                        
                    } catch (error) {
                        alert('Falha ao carregar as categorias:'+ error);
                    } finally {
                        setIsLoading(false); 
                    }
        };
        
        if (dados) {
            carregarCategorias();
            carregarMovimentacoes();
        }
        
    }, [dados.dataAtual, dados.userID]);

    if (isLoading) {
        return <Loading />;
    }

    if (status == 'error') {
        return <p>Ocorreu um erro!</p>;
    }

    let total = 0;

    const deletarMovi = async (id: string) => {
        setIsLoading(true);
        try {
            // Usando diretamente as variáveis do array de dependências


            const dadosApi = await deletaMovimentacao(id);

            if(dadosApi){
                setMovimentacoes(prev => prev?.filter(mov => mov.id !== id));
            } else {
                setStatus('error');
            }
            
            setStatus('success');
            setIsLoading(false);
            
        } catch (error) {
            console.error('Falha ao carregar as movimentações:', error);
            setStatus('error');
            setIsLoading(false);
        }
    }

    return (
    <div className="w-full">
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-4 montserrat text-center">Movimentos</h2>
      </div>
      <div className="w-full flex flex-col gap-3 px-2">
        {/* Usamos .map() para percorrer o array de movimentações */}
        {movimentacoes && movimentacoes.map((movimentacao) => {
            // Para cada item, encontramos a categoria correspondente
            const categoria = categorias.find(cat => cat.id === movimentacao.categoriaId)
            total = categoria && categoria.desconto ? (total - movimentacao.valor) : (total + movimentacao.valor)

            return (
                // 'key' é essencial para o React identificar cada item da lista
                <div key={movimentacao.id} className="flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between rounded-md w-full bg-gray-200 p-2 md:p-4">
                    <div className="md:w-9/20">
                        <p className="text-center md:text-left">
                        <span className="font-bold">Movimentação: </span>
                        {movimentacao.nome}
                        </p>
                    </div>
                    <div className="md:w-8/20">
                        <p className="text-center md:text-left">
                        <span className="font-bold">Categoria: </span>
                        {/* Exibimos o nome da categoria encontrada ou 'N/A' se não encontrar */}
                        {categoria && categoria.name || 'N/A'}
                        </p>
                    </div>
                    <div className="md:w-2/20">
                        <p className="text-center">
                        <span className="font-bold">Valor: </span>
                        {/* A desconto for true é positivo (verde), caso contrário é negativo (vermelho) */}
                        <span className={categoria && categoria.desconto == false ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}>
                            {'R$'+movimentacao.valor.toFixed(2)}
                        </span>
                        </p>
                    </div>
                    <div className="md:w-1/20">
                        <p className="flex justify-center md:justify-end">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white clickable" onClick={() => deletarMovi(movimentacao.id)} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                        </svg>
                        </p>
                    </div>
                </div>
            );
            })}
        <div key={total}
        className="flex flex-col md:flex-row md:justify-between w-full border-gray-200 border-b-1 p-2 md:p-4"
    >
        <div className="md:w-full">
            <div className="w-full md:w-19/20 flex justify-end">
                <p className="md:w-2/20 md:ml-12 text-center">
                    <span className="font-bold">Total: <span className={total >= 0 ? 'text-green-500' : 'text-red-500'}>R${total.toFixed(2)}</span></span>
                </p>
            </div>
        </div>
    </div>
      </div>
    </div>
  );
}