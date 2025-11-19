'use client'

import { useState, useEffect } from "react";
import Loading from "../loading/loading";
import insereCategoria from "@/server/categoria/inserirCategoria";
import buscaCategorias from "@/server/categoria/buscaCategoria";
import type React from "react";
interface Categoria {
    id: string;
    userId: string;
    name: string;
    description: string | null;
    valor: number | null;
    desconto: boolean;
}
export function InputCategoria(
    {dados,setCategoria}: {
        dados: { 
            userID: string
        },
        setCategoria : React.Dispatch<React.SetStateAction<Categoria[] | undefined>>,
        categorias?: Categoria[]
    },
){
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
                    setErroValor({
                    nome: ""+error,
                    valor: ""+error
                })
                } finally {
                    setIsLoading(false); 
                }
    };
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        desconto: false,
        valor: 0
    });
    
    const [erroValor, setErroValor] = useState({
        nome: '',
        valor: ''
    });

    if (isLoading) {
        return <Loading />;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        const updatedValue = name === 'valor'
            ? (parseFloat(value) || 0)
            : (type === 'checkbox' ? checked : value);
        setFormData(prevState => ({
            ...prevState,
            [name]: updatedValue as never,
        }));

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

        // Validação de grupo (senha e confirmação)
        if (name == 'valor' && (parseFloat(value) || 0) <= 0) {
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
                valor: ''
            }
        };

        // Validação de campo individual
        if (!formData.nome) {
            novosErros.errosMsg.nome = 'O nome é obrigatório.';
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

            console.log(formData);

            try{
                // Usando diretamente as variáveis do array de dependências
                 await insereCategoria({
                        userId: dados.userID.toString(),
                        name: formData.nome,
                        description: formData.descricao ?? '',
                        valor: formData.valor,
                        desconto: formData.desconto,
                    })

                setIsLoading(false);
                setErroValor({
                    nome: '',
                    valor: ''
                });
                carregarCategorias()
            } catch (er) {
                console.log(er)
                setIsLoading(false);
            }
        } else {
            // Formulário inválido, exibe os erros
            const erros = validationErrors.errosMsg;
            setErroValor({
                nome: erros.nome,
                valor: erros.valor
            });
            console.log('Erros de validação:', validationErrors);
            console.log('state:', erroValor);
        }
    };

    return(
        <div className="contianer mx-auto p-4 w-full shadow-md bg-white rounded-lg">
            <div className="w-full">
                <h2 className="text-center font-bold mb-3">Adicione uma nova categoria</h2>
                <ul>
                    <li>
                        <p className="p-2 text-gray-500">Adicione um valor para a categoria apenas se for uma meta, caso contrário pode ser deixado sem valor.</p>
                    </li>
                    <li>
                        <p className="p-2 text-gray-500">Marque o item &quot;Categoria será desconto?&quot; caso a categoria represente uma diminuição na sua renda.</p>
                    </li>
                </ul>
            </div>
            <form onSubmit={handleSubmit} id="formAddMovimentacao" className="mt-2 lg:flex lg:space-x-4">
                <div className="w-full lg:w-1/2 p-2">
                    <input onChange={handleChange} name='nome' type="text" className="w-full rounded-md border-1 border-gray-100 p-2" placeholder="Nome da Categoria"/>
                    {erroValor.nome != '' && <p className="text-red-500 text-sm mt-1">{erroValor.nome}</p>}
                </div>
                <div className="w-full lg:w-1/2 p-2">
                    <input onChange={handleChange} name='descricao' type="text" className="w-full rounded-md border-1 border-gray-100 p-2" placeholder="Descrição da Categoria"/>
                </div>
                <div className="w-full lg:w-1/2 p-2">
                    <div className="flex items-center gap-3 mt-2">
                        <input onChange={handleChange} name='desconto' id='desconto'  type="checkbox" checked={formData.desconto} className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <label  htmlFor='desconto' className="text-gray-700" >
                            Categoria será desconto?
                        </label>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 p-2">
                    <input onChange={handleChange} name='valor' type="number" className="w-full rounded-md border-1 border-gray-100 p-2" step={`0.01`} placeholder="Meta da categoria: 0.00"/>
                    {erroValor.valor && <p className="text-red-500 text-sm mt-1">{erroValor.valor}</p>}
                </div>
                <div className="w-full lg:w-1/2 p-2">
                    <button type='submit' className="w-full mx-auto lg:w-1/2 bg-green-600 hover:bg-[#44c762] transition-colors delay-75 p-2 rounded-md text-white cursor-pointer">Enviar</button>
                </div>
            </form>
        </div>
    )
}