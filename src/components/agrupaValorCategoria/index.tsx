'use client'

import { useState, useEffect } from "react";
import Loading from "../loading/loading";

export function AgrupaValorCategoria(
    { dados }: { 
        dados: { 
            dataAtual: string; 
            userID: number 
        }
    },
) {

    const [movimentacoes, setMovimentacoes] = useState([]);
    
    const [categorias, setCategoria] = useState([{}]);

    useEffect(() => {
        console.log(categorias)
    }, [categorias, movimentacoes])

    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const [isLoading, setIsLoading] = useState(true); // Começa como true
    const dataSeparada = dados.dataAtual ?  dados.dataAtual.split('/'): ['', ''];
    const month = dataSeparada[0];
    const year = dataSeparada[1];

    useEffect(() => {
        // A função é definida dentro do useEffect para capturar as variáveis
        // 'month', 'year' e 'dados' do escopo do render atual.
        const carregarCategorias = async () => {
            try {
                // Usando diretamente as variáveis do array de dependências
                const response = await fetch(`/api/movimentacoes/summary/?type=monthly&userId=${dados.userID}&year=${year}&month=${month}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error('A resposta da rede não foi OK');
                }

                const dadosApi = await response.json();
                
                if(Array.isArray(dadosApi.movimentacoes)){
                    setMovimentacoes(dadosApi.movimentacoes);
                } else {
                    setMovimentacoes([]);
                    setStatus('error');
                }

                if(dadosApi.categoriaMap){
                    const categoriasTemp = Object.entries(dadosApi.categoriaMap);
                    setCategoria(categoriasTemp);
                } else {
                    setCategoria([]);
                    setStatus('error');
                }
                
                setStatus('success');
                
            } catch (error) {
                console.error('Falha ao carregar as movimentações:', error);
                setStatus('error');
            } finally {
                // É uma boa prática colocar o setIsLoading(false) no 'finally'
                // para que seja executado tanto em caso de sucesso quanto de erro.
                setIsLoading(false); 
            }
        };
        
        // Adicionamos uma condição para só chamar a função se tivermos um userID válido.
        // Isso evita uma chamada à API com "undefined" na URL na primeira renderização.
        if (dados) {
            carregarCategorias();
        }
        
    // O Array de Dependências que quebra o loop infinito.
    }, [dados.dataAtual, dados.userID]);

    if (isLoading) {
        return <Loading />;
    }

    if (status == 'error') {
        return <p>Ocorreu um erro!</p>;
    }

    return (
    <div className="w-full">
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-4 montserrat text-center">Categorias</h2>
      </div>
      <div className="w-full flex flex-col gap-3 px-2">
        {/* Usamos .map() para percorrer o array de movimentações */}
        <ul className="p-3 rounded-md bg-gray-200">
            {categorias.map((cat) => {
                return(
                    <li key={cat[0]} className="font-bold">
                        {cat[1].nome + ' - R$' + cat[1].valor}
                    </li>
                )
            })}
        </ul>
      </div>
    </div>
  );
}