'use client'

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import Loading from "../loading/loading";
import buscaCategorias from "@/server/categoria/buscaCategoria";
import { inserirMovimentos } from "@/server/movimentacoes/inserirMovimento";
import buscaMovimentos from "@/server/movimentacoes/buscaMovimentacoes";
import type React from "react";
interface Movimentacoes {
    data: Date;
    nome: string;
    valor: number;
    id: string;
    descricao: string | null;
    userId: string;
    categoriaId: string;
}
export function InputMovimentos(
    {dados,setMovimentacoes,movimentacoes}: {
        dados: { 
            dataAtual: string; 
            userID: string 
        },
        setMovimentacoes : Dispatch<SetStateAction<Movimentacoes[]>>,
        movimentacoes? : Movimentacoes[]
    }
){
    interface categorias {
    id: string;
    userId: string;
    name: string;
    description: string | null;
    valor: number | null;
    desconto: boolean;
    }

    // Carregar Categorias
    const [categorias, setCategorias] = useState<categorias[]>([]);
    const [status, setStatus] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const carregarMovimentacoes = async () => {
                try {
                    if(dados.userID){
                        
                        const movimentacoesApi = await buscaMovimentos(dados.userID);
                        if(Array.isArray(movimentacoesApi)){
                            setMovimentacoes(movimentacoesApi);
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
                    setCategorias(dadosApi);
                    setStatus('success');
                }
                
            } catch (error) {
                console.error('Falha ao carregar as movimentações:', error);
                setStatus('error');
            } finally {

                setIsLoading(false); 
            }
        };

        
        if (dados) {
            carregarCategorias();
        }
    }, [dados.userID]);
    
    interface FormData {
        nome: string;
        categoria: string;
        valor: number;
    }
    const [formData, setFormData] = useState<FormData>({
        nome: '',
        categoria: '',
        valor: 0
    });

    const [erroValor, setErroValor] = useState({
        nome: '',
        categoria: '',
        valor: ''
    });

    if (isLoading) {
        return <Loading />;
    }

    if (status == 'error') {
        return <p>Ocorreu um erro!</p>;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'valor') {
            const n = parseFloat(value) || 0;
            setFormData(prev => ({ ...prev, valor: n }));
        } else if (name === 'nome') {
            setFormData(prev => ({ ...prev, nome: value }));
        } else if (name === 'categoria') {
            setFormData(prev => ({ ...prev, categoria: value }));
        }

        // Verifica o erro ao modificar o campo
        // Validação de campo individual
        if (name == 'nome' && !value) {
            setErroValor(prevState => ({
                ...prevState,
                nome: 'O nome é obrigatório.'
            }));
        } else if (name == 'nome' && value) {
            setErroValor(prevState => ({
                ...prevState,
                nome: ''
            }));
        }

        if (name == 'categoria' && !value) {
            setErroValor(prevState => ({
                ...prevState,
                categoria: 'A categoria é obrigatória.'
            }));
        } else if (name == 'categoria' && value) {
            setErroValor(prevState => ({
                ...prevState,
                categoria: ''
            }));
        }

        // Validação de grupo (senha e confirmação)
        if (name == 'valor' && !value) {
            setErroValor(prevState => ({
                ...prevState,
                valor: 'O valor é obrigatório.'
            }));
        } else if (name == 'valor' && (parseFloat(value) || 0) <= 0) {
            setErroValor(prevState => ({
                ...prevState,
                valor: 'O valor deve ser positivo e maior que 0.'
            }));

            e.target.value = '0';
        } else if (name == 'valor' && (parseFloat(value) || 0) > 0) {
            setErroValor(prevState => ({
                ...prevState,
                valor: ''
            }));
        }
    };

    const validateForm = () => {
        const novosErros = {
            errors: 0,
            errosMsg: {
                nome: '',
                categoria: '',
                valor: ''
            }
        };

        // Validação de campo individual
        if (!formData.nome) {
            novosErros.errosMsg.nome = 'O nome é obrigatório.';
            novosErros.errors += 1;
        }

        if (!formData.categoria) {
            novosErros.errosMsg.categoria = 'A categoria é obrigatória.';
            novosErros.errors += 1;
        }

        // Validação de grupo (senha e confirmação)
        if (!formData.valor) {
            novosErros.errosMsg.valor = 'O valor é obrigatório.';
            novosErros.errors += 1;
        } else if (formData.valor <= 0) {
            novosErros.errosMsg.valor = 'O valor deve ser positivo e maior que 0.';
            novosErros.errors += 1;
        }

        return novosErros;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (validationErrors.errors === 0) {
            // Formulário válido, pode enviar os dados
            setIsLoading(true);
            try{
                const dataEnvio = new Date(dados.dataAtual.slice(0,3)+'02/'+dados.dataAtual.slice(3));

                // Usando diretamente as variáveis do array de dependências
                const response = await inserirMovimentos({
                        userId: dados.userID.toString(),
                        categoriaId: formData.categoria,
                        nome: formData.nome,
                        valor: formData.valor,
                        data: dataEnvio,
                        descricao: ''
                    });

                if (!response) {
                    throw new Error('A resposta da rede deu erro');
                }
                carregarMovimentacoes()
                setIsLoading(false);

                setErroValor({
                    nome: '',
                    categoria: '',
                    valor: ''
                });
            } catch (er) {
                setErroValor({
                    nome: ""+er,
                    categoria: ""+er,
                    valor: ""+er
                })
                setIsLoading(false);
            }
        } else {
            // Formulário inválido, exibe os erros
            const erros = validationErrors.errosMsg;
            setErroValor({
                nome: erros.nome,
                categoria: erros.categoria,
                valor: erros.valor
            });
            console.log('Erros de validação:', validationErrors);
            console.log('state:', erroValor);
        }
    };

    return(
        <div className="contianer mx-auto p-4 w-full shadow-md bg-white rounded-lg">
            <div className="w-full">
                <h2 className="text-center font-bold mb-3">Adicione uma nova movimentação</h2>
            </div>
            <form onSubmit={handleSubmit} id="formAddMovimentacao" className="lg:flex lg:space-x-4">
                <div className="w-full lg:w-1/4 p-2">
                    <input onChange={handleChange} name='nome' type="text" className="w-full rounded-md border-1 border-gray-100 p-2" placeholder="Nome da Movimentação"/>
                    {erroValor.nome != '' && <p className="text-red-500 text-sm mt-1">{erroValor.nome}</p>}
                </div>
                <div className="w-full lg:w-1/4 p-2">
                    <select onChange={handleChange} name='categoria' defaultValue="" className="w-full rounded-md border-1 border-gray-100 p-2">
                        {/* Opção padrão, funciona como um placeholder */}
                        <option value="" disabled>
                            Selecione uma Categoria
                        </option>

                        {/* Mapeia a variável 'categorias' para criar as opções */}
                        {categorias && categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.name}
                            </option>
                        ))}
                    </select>
                    {erroValor.categoria && <p className="text-red-500 text-sm mt-1">{erroValor.categoria}</p>}
                </div>
                <div className="w-full lg:w-1/4 p-2">
                    <input onChange={handleChange} name='valor' type="number" className="w-full rounded-md border-1 border-gray-100 p-2" step={`0.01`} placeholder="0.00"/>
                    {erroValor.valor && <p className="text-red-500 text-sm mt-1">{erroValor.valor}</p>}
                </div>
                <div className="w-full lg:w-1/4 p-2">
                    <button type='submit' className="cursor-pointer w-full mx-auto lg:w-1/2 bg-green-600 hover:bg-[#44c762] transition-colors delay-75 p-2 rounded-md text-white">Enviar</button>
                </div>
            </form>
        </div>
    )
}