'use client';

import Loading from "@/components/loading/loading";
import { useState } from "react";

export default function Page(){

    const [status, setStatus] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        ano: '',
        mes: ''
    });

    const [erroValor, setErroValor] = useState({
        ano: '',
        mes: ''
    });

    if (isLoading) {
        return <Loading />;
    }

    if (status == 'error') {
        return <p>Ocorreu um erro!</p>;
    }

    const handleChange = (e:any) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));

        // Verifica o erro ao modificar o campo
        // Validação de campo individual
        if (name == 'ano' && !value) {
            setErroValor(prevState => ({
                ...prevState,
                ano: 'O ano é obrigatório.'
            }));
        } else if (name == 'ano' && parseInt(value) <= 0) {
            setErroValor(prevState => ({
                ...prevState,
                ano: 'Ano deve ser um valor maior que 0.'
            }));
        } else if (name == 'ano' && value.length != 4) {
            setErroValor(prevState => ({
                ...prevState,
                ano: 'Ano deve ter 4 caracteres'
            }));
        } else if (name == 'ano' && value.length == 4) {
            setErroValor(prevState => ({
                ...prevState,
                ano: ''
            }));
        }

        if (name == 'mes' && !value) {
            setErroValor(prevState => ({
                ...prevState,
                mes: 'O mês é obrigatório.'
            }));
        } else if (name == 'mes' && parseInt(value) <= 0) {
            setErroValor(prevState => ({
                ...prevState,
                mes: 'Mês deve ser um valor maior que 0.'
            }));
        } else if (name == 'mes' && value.length != 2) {
            setErroValor(prevState => ({
                ...prevState,
                mes: 'Mês deve ter 2 caracteres'
            }));
        } else if (name == 'mes' && parseInt(value) > 12) {
            setErroValor(prevState => ({
                ...prevState,
                mes: 'Mês não pode ser maior que 12'
            }));
        } else if (name == 'mes' && value.length == 2) {
            setErroValor(prevState => ({
                ...prevState,
                mes: ''
            }));
        }
    };

    const validateForm = () => {
        let novosErros = {
            errors: 0,
            errosMsg: {
                ano: '',
                mes: ''
            }
        };

        // Validação de campo individual
        if (!formData.ano) {
            novosErros.errosMsg.ano = 'O ano é obrigatório.';
            novosErros.errors += 1;
        }
        
        if (!formData.mes) {
            novosErros.errosMsg.mes = 'O mês é obrigatório.';
            novosErros.errors += 1;
        }

        return novosErros;
    };

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (validationErrors.errors === 0 && erroValor.ano == '' && erroValor.mes == '') {
            // Formulário válido, pode enviar os dados
            setIsLoading(true);

            window.location.href = window.location.href+'/'+formData.mes+'-'+formData.ano;
            setIsLoading(false);
        } else {
            if(erroValor.ano == '' && erroValor.mes == ''){
                // Formulário inválido, exibe os erros
                const erros = validationErrors.errosMsg;
                setErroValor({
                    ano: erros.ano,
                    mes: erros.mes
                });
            }
        }
    };
    return (
        <div className="contianer mx-auto p-4 w-full shadow-md bg-white rounded-lg">
            <div className="w-full">
                <h2 className="text-center font-bold mb-3">Digite um ano e mês</h2>
                <ul>
                    <li>
                        <p className="p-2 text-gray-500">O ano deve seguir o padrão YYYY (por exemplo: 2025) e o mês o padrão MM (por exemplo: 09 ou 11)</p>
                    </li>
                </ul>
            </div>
            <form onSubmit={handleSubmit} id="formAddMovimentacao" className="mt-2 lg:flex lg:space-x-4">
                <div className="w-full lg:w-1/2 p-2">
                    <input onChange={handleChange} name='ano' type="text" className="w-full rounded-md border-1 border-gray-100 p-2" placeholder="Ano"/>
                    {erroValor.ano != '' && <p className="text-red-500 text-sm mt-1">{erroValor.ano}</p>}
                </div>
                <div className="w-full lg:w-1/2 p-2">
                    <input onChange={handleChange} name='mes' type="text" className="w-full rounded-md border-1 border-gray-100 p-2" placeholder="Mês"/>
                    {erroValor.mes != '' && <p className="text-red-500 text-sm mt-1">{erroValor.mes}</p>}
                </div>
                <div className="w-full lg:w-1/2 p-2">
                    <button type='submit' className="cursor-pointer w-full mx-auto lg:w-1/2 bg-green-600 hover:bg-[#44c762] transition-colors delay-75 p-2 rounded-md text-white">Enviar</button>
                </div>
            </form>
        </div>

    )
}