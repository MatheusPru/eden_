'use client'

import { useState, useEffect } from "react";
import type React from "react";
import Loading from "../loading/loading";
import buscaCategorias from "@/server/categoria/buscaCategoria";
import deletaCategoria from "@/server/categoria/deletaCategoria";
interface Categoria {
    id: string;
    userId: string;
    name: string;
    description: string | null;
    valor: number | null;
    desconto: boolean;
}
export function ListaCategoria(
    { dados,setCategoria,categorias }: { 
        dados: { 
            userID: string
        },
        setCategoria : React.Dispatch<React.SetStateAction<Categoria[] | undefined>>,
        categorias?: Categoria[]
    },
) {
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
    function deletarCat(catId : string){  
            const delecao = async () =>{ 
                try{
                    const response = await deletaCategoria(catId)
                    if(!response){
                        throw new Error('Erro na deleção')
                    }
                }catch(err){
                    alert(err)
                }

            }
            delecao()
            carregarCategorias()
    }




    const [isLoading, setIsLoading] = useState(true); // Começa como true

    useEffect(() => {

        if (dados) {
            carregarCategorias();
        }

    }, [dados.userID]);


    if (isLoading) {
        return <Loading />;
    }
    
    return (
    <div className="w-full">
        <div className="w-full">
            <h2 className="text-2xl font-bold mb-4 montserrat text-center">Categorias</h2>
        </div>
        <div className="w-full flex flex-col gap-3 px-2">
            {/* Usamos .map() para percorrer o array de movimentações */}
            {categorias && categorias.map((categoria) => {
                return (
                    // 'key' é essencial para o React identificar cada item da lista
                    <div key={categoria.id} className="flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between rounded-md w-full bg-gray-200 p-2 md:p-4">
                        <div className="md:w-5/20">
                            <p className="text-center md:text-left">
                            <span className="font-bold">Categoria: </span>
                            {categoria.name}
                            </p>
                        </div>
                        <div className="md:w-5/20">
                            <p className="text-center md:text-left">
                            <span className="font-bold">Descrição: </span>
                            {/* Exibimos o nome da categoria encontrada ou 'N/A' se não encontrar */}
                            {categoria?.description || 'N/A'}
                            </p>
                        </div>
                        <div className="md:w-3/20">
                            <p className="flex justify-center">
                            <span className="font-bold">Desconto: </span>
                            {/* A desconto for true é positivo (verde), caso contrário é negativo (vermelho) */}
                            {categoria.desconto == true ? <svg className="w-6 h-6 text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5"/></svg> : <svg className="w-6 h-6 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/></svg>}
                            </p>
                        </div>
                        <div className="md:w-4/20">
                            <p className="text-center">
                            <span className="font-bold">Valor: </span>
                            {categoria?.valor ? 'R$'+(categoria?.valor).toFixed(2) : 'N/A' }
                            </p>
                        </div>
                        { <div className="md:w-1/20">
                            <p className="flex justify-center md:justify-end">
                            <svg className="w-6 h-6 text-gray-800 dark:text-white clickable" onClick={() => deletarCat(categoria.id)} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                            </svg>
                            </p>
                        </div> }
                    </div>
                );
            })}
        </div>
    </div>
  );
}